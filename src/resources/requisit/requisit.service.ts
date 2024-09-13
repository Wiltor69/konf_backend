import { Injectable } from '@nestjs/common';
import { CreateRequisitDto } from './dto/create-requisit.dto';
import { UpdateRequisitDto } from './dto/update-requisit.dto';
import { Requisit, RequisitDocument } from './entities/requisit.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ELanguage } from '../util/enum';

@Injectable()
export class RequisitService {
  constructor(
    @InjectModel(Requisit.name) private requisitModel: Model<RequisitDocument>,
  ) {}

  create(createRequisitDto: CreateRequisitDto) {
    const newRequisit = new this.requisitModel(createRequisitDto);
    return newRequisit.save();
  }

  findAll(): Promise<Requisit[]> {
    return this.requisitModel.find().exec();
  }

  findOne(id: string): Promise<Requisit> {
    return this.requisitModel.findById(id);
  }

  async findByLanguage(language: ELanguage): Promise<Requisit[]> {
    return this.requisitModel.find({ language }).exec();
  }

  update(id: string, updateRequisitDto: UpdateRequisitDto): Promise<Requisit> {
    return this.requisitModel.findByIdAndUpdate(id, updateRequisitDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Requisit> {
    return this.requisitModel.findByIdAndDelete(id);
  }
}
