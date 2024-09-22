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

  findOne(id: string): Promise<Event> {
    return this.eventModel.findById(id).populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Event[]> {
    return this.eventModel.find({ language }).populate('image');
  }

  update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    });
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
