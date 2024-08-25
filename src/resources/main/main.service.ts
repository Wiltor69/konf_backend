import { Injectable } from '@nestjs/common';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Main, MainDocument } from './entities/main.entity';
import { ELanguage } from '../util/enum';

@Injectable()
export class MainService {
  constructor(@InjectModel(Main.name) private mainModel: Model<MainDocument>) {}

  async create(createMainDto: CreateMainDto) {
    const newMain = new this.mainModel(createMainDto);
    return newMain.save();
  }

  findAll(): Promise<Main[]> {
    return this.mainModel.find().exec();
  }

  findOne(id: string): Promise<Main> {
    return this.mainModel.findById(id).exec();
  }

  async findByLanguage(language: ELanguage): Promise<Main[]> {
    return this.mainModel.find({ language }).exec();
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
