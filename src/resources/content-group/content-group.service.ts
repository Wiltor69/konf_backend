import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ContentGroup,
  ContentGroupDocument,
} from './entities/content-group.entity';
import { Model, Types } from 'mongoose';
import { ELanguage } from '../util/enum';

@Injectable()
export class ContentGroupService {
  constructor(
    @InjectModel(ContentGroup.name)
    private contentGroupModel: Model<ContentGroupDocument>,
  ) {}

  async create(languages: ELanguage[]): Promise<ContentGroupDocument> {
    const createdContentGroup = new this.contentGroupModel({ languages });
    return createdContentGroup.save();
  }

  async addLanguage(
    contentGroupId: string,
    language: ELanguage,
  ): Promise<void> {
    const contentGroup = await this.findByIdOrThrow(contentGroupId);

    if (!contentGroup.languages.includes(language)) {
      contentGroup.languages.push(language);
      await contentGroup.save();
    }
  }

  async findByIdOrThrow(contentGroupId: string): Promise<ContentGroupDocument> {
    if (!Types.ObjectId.isValid(contentGroupId)) {
      throw new ConflictException(`Not valid type of ${contentGroupId}`);
    }

    const contentGroupEntity =
      await this.contentGroupModel.findById(contentGroupId);

    if (!contentGroupEntity) {
      throw new NotFoundException(
        `Content group entity with id ${contentGroupId} not found`,
      );
    }

    return contentGroupEntity;
  }

  async deleteById(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.contentGroupModel.findOneAndDelete({ _id: id }).exec();
  }

  async ensureContentGroup(
    contentGroupId: string | null,
    language: ELanguage,
  ): Promise<string> {
    if (!contentGroupId) {
      const newContentGroup = await this.create([language]);
      return newContentGroup._id.toString();
    } else {
      const existingContentGroup = await this.findByIdOrThrow(contentGroupId);
      if (existingContentGroup.languages.includes(language)) {
        throw new ConflictException(
          `Entity on ${language} language is already exist`,
        );
      }
      await this.addLanguage(contentGroupId, language);
      return contentGroupId;
    }
  }
}
