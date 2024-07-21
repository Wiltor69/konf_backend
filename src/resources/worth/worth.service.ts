import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorthDto } from './dto/create-worth.dto';
import { UpdateWorthDto } from './dto/update-worth.dto';
import { Worth, WorthDocument } from './entities/worth.entity';

import { Model } from 'mongoose';

@Injectable()
export class WorthService {
  constructor(
    @InjectModel(Worth.name) private worthModel: Model<WorthDocument>,
  ) {}

  create(createWorthDto: CreateWorthDto): Promise<Worth> {
    const newWorth = new this.worthModel(createWorthDto);
    return newWorth.save();
  }

  findAll(): Promise<Worth[]> {
    return this.worthModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} worth`;
  }

  update(id: number, updateWorthDto: UpdateWorthDto) {
    return `This action updates a #${id} worth`;
  }

  remove(id: number) {
    return `This action removes a #${id} worth`;
  }
}
