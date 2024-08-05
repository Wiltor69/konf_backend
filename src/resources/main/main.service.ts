import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorthService } from '../worth/worth.service';
import { EventsService } from '../events/events.service';
import { HelpService } from '../help/help.service';
import { Model } from 'mongoose';
import { Main, MainDocument } from './entities/main.entity';
import { PartnerService } from '../partner/partner.service';
import { ContactService } from '../contact/contact.service';
import { AddAllModelsDto } from './dto/add-all-models.dto';

@Injectable()
export class MainService {
  constructor(
    @InjectModel(Main.name) private mainModel: Model<MainDocument>,
    private readonly worthService: WorthService,
    private readonly eventService: EventsService,
    private readonly helpService: HelpService,
    private readonly partnerService: PartnerService,
    private readonly contactService: ContactService,
  ) {}

  async create(createMainDto: CreateMainDto) {
    // const newMain = new this.mainModel(createMainDto);
    // return newMain.save();

    const addallmodelsDto: AddAllModelsDto = { ...createMainDto };

    const worth = await this.worthService.findAll();
    const event = await this.eventService.findAll();
    const help = await this.helpService.findAll();
    const partner = await this.partnerService.findAll();
    const contact = await this.contactService.findAll();

    if (!worth) {
      throw new NotFoundException('Worth not found');
    } else {
      addallmodelsDto.worth = worth;
    }

    if (!event) {
      throw new NotFoundException('Event not found');
    } else {
      addallmodelsDto.event = event;
    }
    if (!help) {
      throw new NotFoundException('Help not found');
    } else {
      addallmodelsDto.help = help;
    }

    if (!partner) {
      throw new NotFoundException('Partner not found');
    } else {
      addallmodelsDto.partner = partner;
    }

    if (!contact) {
      throw new NotFoundException('Contact not found');
    } else {
      addallmodelsDto.contact = contact;
    }

    const newMain = new this.mainModel({
      ...addallmodelsDto,
      // worth: addallmodelsDto.worth,
      // event: addallmodelsDto.event,
    });
    return await newMain.save();
  }

  findAll(): Promise<Main[]> {
    return this.mainModel
      .find()
      .populate(['worth', 'event', 'contact', 'help', 'partner']);
  }

  findOne(id: string): Promise<Main> {
    return this.mainModel
      .findById(id)
      .populate(['worth', 'event', 'contact', 'help', 'partner']);
  }

  update(id: string, updateMainDto: UpdateMainDto): Promise<Main> {
    return this.mainModel.findByIdAndUpdate(id, updateMainDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Main> {
    return this.mainModel.findByIdAndDelete(id);
  }
}
