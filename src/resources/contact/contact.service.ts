import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './entities/contact.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createContactDto.contentGroupId,
      createContactDto.language,
    );
    const newContact = new this.contactModel({
      ...createContactDto,
      contentGroupId,
    });
    await newContact.save();
    return newContact;
  }

  findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async findByLanguage(language: ELanguage): Promise<Contact[]> {
    return this.contactModel.find({ language }).exec();
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const update = { $set: updateContactDto };
    const contact = await this.contactModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async updateAll(
    contentGroupId: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact[]> {
    const update = { $set: updateContactDto };
    const result = await this.contactModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Contact entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.contactModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteContact = await this.contactModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    try {
      if (deleteContact.contentGroupId) {
        await this.contactModel
          .deleteMany({ contentGroupId: deleteContact.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteContact.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
