import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequisitDto } from './dto/create-requisit.dto';
import { UpdateRequisitDto } from './dto/update-requisit.dto';
import { Requisit, RequisitDocument } from './entities/requisit.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class RequisitService {
  constructor(
    @InjectModel(Requisit.name) private requisitModel: Model<RequisitDocument>,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createRequisitDto: CreateRequisitDto): Promise<Requisit> {
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createRequisitDto.contentGroupId,
      createRequisitDto.language,
    );
    const newRequisit = new this.requisitModel({
      ...createRequisitDto,
      contentGroupId,
    });
    return newRequisit.save();
  }

  findAll(): Promise<Requisit[]> {
    return this.requisitModel.find().exec();
  }

  async findOne(id: string): Promise<Requisit> {
    const requisit = await this.requisitModel.findById(id).exec();
    if (!requisit) {
      throw new NotFoundException(`Requisit with ID ${id} not found`);
    }
    return requisit;
  }

  async findByLanguage(language: ELanguage): Promise<Requisit[]> {
    return this.requisitModel.find({ language }).exec();
  }

  async update(
    id: string,
    updateRequisitDto: UpdateRequisitDto,
  ): Promise<Requisit> {
    const update = { $set: updateRequisitDto };
    const requisit = await this.requisitModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!requisit) {
      throw new NotFoundException(`Requisit with ID ${id} not found`);
    }
    return requisit;
  }

  async updateAll(
    contentGroupId: string,
    updateRequisitDto: UpdateRequisitDto,
  ): Promise<Requisit[]> {
    const update = { $set: updateRequisitDto };
    const result = await this.requisitModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Requisit entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.requisitModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteRequisit = await this.requisitModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteRequisit) {
      throw new NotFoundException(`Requisit with ID ${id} not found`);
    }
    try {
      if (deleteRequisit.contentGroupId) {
        await this.requisitModel
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
