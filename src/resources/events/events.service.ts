import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Event, EventDocument } from './entities/event.entity';
import { ImageService } from '../image/image.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const isImage = await this.imageService.findOne(createEventDto.imageEvent);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    }
    const newEvent = new this.eventModel(createEventDto);
    return await newEvent.save();
  }

  findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  findOne(id: string): Promise<Event> {
    return this.eventModel.findById(id);
  }

  update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id);
  }
}
