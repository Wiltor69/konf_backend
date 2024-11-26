import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCurrencyrequisitDto } from './dto/create-currencyrequisit.dto';
import { UpdateCurrencyrequisitDto } from './dto/update-currencyrequisit.dto';
import { ContentGroupService } from '../content-group/content-group.service';
import { EntityLimitService } from '../content-group/entity-limit.service';
import { InjectModel } from '@nestjs/mongoose';
import {
  Currencyrequisit,
  CurrencyrequisitDocument,
} from './entities/currencyrequisit.entity';
import { Model, Types } from 'mongoose';
import { ELimitEntity } from '../util/limit-entity.enum';
import { ELanguage } from '../util/enum';

@Injectable()
export class CurrencyrequisitService {
  constructor(
    @InjectModel(Currencyrequisit.name)
    private currencyrequisitModel: Model<CurrencyrequisitDocument>,
    private readonly contentGroupService: ContentGroupService,
    private readonly entityLimitService: EntityLimitService,
  ) {}

  async create(
    createCurrencyrequisitDto: CreateCurrencyrequisitDto,
  ): Promise<Currencyrequisit> {
    await this.entityLimitService.checkEntityLimit(
      this.currencyrequisitModel,
      ELimitEntity.CURRENCYREQUISIT,
    );
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createCurrencyrequisitDto.contentGroupId,
      createCurrencyrequisitDto.language,
    );
    const newRequisit = new this.currencyrequisitModel({
      ...createCurrencyrequisitDto,
      contentGroupId,
    });
    return newRequisit.save();
  }

  findAll(): Promise<Currencyrequisit[]> {
    return this.currencyrequisitModel.find().exec();
  }

  async findOne(id: string): Promise<Currencyrequisit> {
    const requisit = await this.currencyrequisitModel.findById(id).exec();
    if (!requisit) {
      throw new NotFoundException(`Requisit with ID ${id} not found`);
    }
    return requisit;
  }

  async findByLanguage(language: ELanguage): Promise<Currencyrequisit[]> {
    return this.currencyrequisitModel.find({ language }).exec();
  }

  async findOneByLanguageAndContentGroupId(
    contentGroupId: Types.ObjectId,
    lang: ELanguage,
  ) {
    const query = this.currencyrequisitModel
      .where('contentGroupId', contentGroupId)
      .where('language', lang);

    const requisit = await query.findOne().exec();
    if (!requisit) {
      throw new NotFoundException(
        `Entity with contentGroupId ${contentGroupId} and language ${lang} not found`,
      );
    }
    return requisit;
  }

  async update(
    id: string,
    updateCurrencyRequisitDto: UpdateCurrencyrequisitDto,
  ): Promise<Currencyrequisit> {
    const update = { $set: updateCurrencyRequisitDto };
    const requisit = await this.currencyrequisitModel.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
      },
    );
    if (!requisit) {
      throw new NotFoundException(`Requisit with ID ${id} not found`);
    }
    return requisit;
  }

  async updateAll(
    contentGroupId: string,
    updateCurrencyRequisitDto: UpdateCurrencyrequisitDto,
  ): Promise<Currencyrequisit[]> {
    const update = { $set: updateCurrencyRequisitDto };
    const result = await this.currencyrequisitModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Requisit entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.currencyrequisitModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteRequisit = await this.currencyrequisitModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteRequisit) {
      throw new NotFoundException(`Requisit with ID ${id} not found`);
    }
    try {
      if (deleteRequisit.contentGroupId) {
        await this.currencyrequisitModel
          .deleteMany({ contentGroupId: deleteRequisit.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(
          deleteRequisit.contentGroupId,
        );
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
