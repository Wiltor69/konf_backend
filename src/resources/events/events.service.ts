import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { ImageService } from '../image/image.service';
import { AddImageEventDto } from './dto/add-image-event.dto';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const addImageEventDto: AddImageEventDto = { ...createEventDto };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createEventDto.contentGroupId,
      createEventDto.language,
    );
    const isImage = await this.imageService.findOne(
      createEventDto.imageEventId,
    );
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageEventDto.image = isImage;
    }

    const newEvent = new this.eventModel({
      ...addImageEventDto,
      isImage: addImageEventDto.image,
      contentGroupId,
    });
    return await newEvent.save();
  }

  findAll(): Promise<Event[]> {
    return this.eventModel.find().populate('image');
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).populate('image').exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async findByLanguage(language: ELanguage): Promise<Event[]> {
    return this.eventModel.find({ language }).populate('image');
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const update = { $set: updateEventDto };
    const event = await this.eventModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async updateAll(
    contentGroupId: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event[]> {
    const update = { $set: updateEventDto };
    const result = await this.eventModel.updateMany({ contentGroupId }, update);
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Event entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.eventModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteEvent = await this.eventModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    try {
      if (deleteEvent.contentGroupId) {
        await this.eventModel
          .deleteMany({ contentGroupId: deleteEvent.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteEvent.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
