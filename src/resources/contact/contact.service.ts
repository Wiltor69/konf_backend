import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './entities/contact.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Language } from '../util/enum';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  create(createContactDto: CreateContactDto): Promise<Contact> {
    const newContact = new this.contactModel(createContactDto);
    return newContact.save();
  }

  findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  findOne(id: string): Promise<Contact> {
    return this.contactModel.findById(id);
  }

  async findByLanguage(language: Language): Promise<Contact[]> {
    return this.contactModel.find({ where: { language } }).populate('language');
  }

  update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    return this.contactModel.findByIdAndUpdate(id, updateContactDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Contact> {
    return this.contactModel.findByIdAndDelete(id);
  }
}
