import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { Main, MainDocument } from './entities/main.entity';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';
import { EntityLimitService } from '../content-group/entity-limit.service';
import { ELimitEntity } from '../util/limit-entity.enum';

@Injectable()
export class MainService {
  constructor(
    @InjectModel(Main.name) private mainModel: Model<MainDocument>,
    private readonly contentGroupService: ContentGroupService,
    private readonly entityLimitService: EntityLimitService,
  ) {}

  async create(createMainDto: CreateMainDto): Promise<Main> {
    
    await this.entityLimitService.checkEntityLimit(
      this.mainModel,
      ELimitEntity.MAIN,
    );
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createMainDto.contentGroupId,
      createMainDto.language,
    );
    const newMain = new this.mainModel({ ...createMainDto, contentGroupId });
    await newMain.save();
    return newMain;
  }

  findAll(): Promise<Main[]> {
    return this.mainModel.find().exec();
  }

  async findOne(id: string): Promise<Main> {
    const main = await this.mainModel.findById(id).exec();
    if (!main) {
      throw new NotFoundException(`Main with ID ${id} not found`);
    }
    return main;
  }

  async findByLanguage(language: ELanguage): Promise<Main[]> {
    return this.mainModel.find({ language }).exec();
  }

  async findOneByLanguageAndContentGroupId(
    contentGroupId: Types.ObjectId,
    lang: ELanguage,
  ) {
    const query = this.mainModel
      .where('contentGroupId', contentGroupId)
      .where('language', lang);

    const main = await query.findOne().populate('image').exec();
    if (!main) {
      throw new NotFoundException(
        `Entity with contentGroupId ${contentGroupId} and language ${lang} not found`,
      );
    }
    return main;
  }

  async update(id: string, updateMainDto: UpdateMainDto): Promise<Main> {
    const update = { $set: updateMainDto };
    const main = await this.mainModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!main) {
      throw new NotFoundException(`Main with ID ${id} not found`);
    }
    return main;
  }

  async updateAll(
    contentGroupId: string,
    updateMainDto: UpdateMainDto,
  ): Promise<Main[]> {
    const update = { $set: updateMainDto };
    const result = await this.mainModel.updateMany({ contentGroupId }, update);
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Main entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.mainModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteMain = await this.mainModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteMain) {
      throw new NotFoundException(`Main with ID ${id} not found`);
    }
    try {
      if (deleteMain.contentGroupId) {
        await this.mainModel
          .deleteMany({ contentGroupId: deleteMain.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteMain.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
