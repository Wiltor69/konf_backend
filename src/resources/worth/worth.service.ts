import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorthDto } from './dto/create-worth.dto';
import { UpdateWorthDto } from './dto/update-worth.dto';
import { Worth, WorthDocument } from './entities/worth.entity';

import { Model } from 'mongoose';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class WorthService {
  constructor(
    @InjectModel(Worth.name) private worthModel: Model<WorthDocument>,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createWorthDto: CreateWorthDto): Promise<Worth> {
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createWorthDto.contentGroupId,
      createWorthDto.language,
    );
    const newWorth = new this.worthModel({ ...createWorthDto, contentGroupId });
    await newWorth.save();
    return newWorth;
  }

  findAll(): Promise<Worth[]> {
    return this.worthModel.find().exec();
  }

  findOne(id: string): Promise<Worth> {
    return this.worthModel.findById(id);
  }

  async findByLanguage(language: ELanguage): Promise<Worth[]> {
    return this.worthModel.find({ language }).exec();
  }

  update(id: string, updateWorthDto: UpdateWorthDto): Promise<Worth> {
    return this.worthModel.findByIdAndUpdate(id, updateWorthDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    const deleteWorth = await this.worthModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteWorth) {
      throw new NotFoundException(`Worth with ID ${id} not found`);
    }
    try {
      if (deleteWorth.contentGroupId) {
        await this.worthModel
          .deleteMany({ contentGroupId: deleteWorth.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteWorth.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
