import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorthDto } from './dto/create-worth.dto';
import { UpdateWorthDto } from './dto/update-worth.dto';
import { Worth, WorthDocument } from './entities/worth.entity';

import { Model, Types } from 'mongoose';
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

  async findOne(id: string): Promise<Worth> {
    const worth = await this.worthModel.findById(id);
    if (!worth) {
      throw new NotFoundException(`Worth with ID ${id} not found`);
    }
    return worth;
  }

  async findByLanguage(language: ELanguage): Promise<Worth[]> {
    return this.worthModel.find({ language }).exec();
  }

  async findOneByLanguageAndContentGroupId(
    contentGroupId: Types.ObjectId,
    lang: ELanguage,
  ) {
    const query = this.worthModel
      .where('contentGroupId', contentGroupId)
      .where('language', lang);

    const worth = await query.findOne().exec();
    if (!worth) {
      throw new NotFoundException(
        `Entity with contentGroupId ${contentGroupId} and language ${lang} not found`,
      );
    }
    return worth;
  }

  async update(id: string, updateWorthDto: UpdateWorthDto): Promise<Worth> {
    const update = { $set: updateWorthDto };
    const worth = await this.worthModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!worth) {
      throw new NotFoundException(`Worth with ID ${id} not found`);
    }
    return worth;
  }

  async updateAll(
    contentGroupId: string,
    updateWorthDto: UpdateWorthDto,
  ): Promise<Worth[]> {
    const update = { $set: updateWorthDto };
    const result = await this.worthModel.updateMany({ contentGroupId }, update);
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Worth entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.worthModel.find({ contentGroupId }).exec();
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
