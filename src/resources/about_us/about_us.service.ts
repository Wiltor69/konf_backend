import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';
import { AboutUs, AboutUsDocument } from './entities/about_us.entity';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AddImageAboutDto } from './dto/add-image-about.dto';
import { ImageService } from '../image/image.service';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';
import { EntityLimitService } from '../content-group/entity-limit.service';
import { ELimitEntity } from '../util/limit-entity.enum';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUsDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
    private readonly entityLimitService: EntityLimitService,
  ) {}

  async create(createAboutUsDto: CreateAboutUsDto) {
    await this.entityLimitService.checkEntityLimit(
      this.aboutUsModel,
      ELimitEntity.ABOUT_US,
    );
    const addImageAboutDto: AddImageAboutDto = { ...createAboutUsDto };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createAboutUsDto.contentGroupId,
      createAboutUsDto.language,
    );
    const isImage = await this.imageService.findOne(createAboutUsDto.imageId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageAboutDto.image = isImage;
    }
    const newAbout = new this.aboutUsModel({
      ...addImageAboutDto,
      isImage: addImageAboutDto.image,
      contentGroupId,
    });
    return await newAbout.save();
  }

  findAll(): Promise<AboutUs[]> {
    return this.aboutUsModel.find().populate('image');
  }

  async findOne(id: string): Promise<AboutUs> {
    const aboutUs = await this.aboutUsModel
      .findById(id)
      .populate('image')
      .exec();
    if (!aboutUs) {
      throw new NotFoundException(`AboutUs with ID ${id} not found`);
    }
    return aboutUs;
  }
  async findByLanguage(language: ELanguage): Promise<AboutUs[]> {
    return this.aboutUsModel.find({ language }).populate('image');
  }

  async findOneByLanguageAndContentGroupId(
    contentGroupId: Types.ObjectId,
    lang: ELanguage,
  ) {
    const query = this.aboutUsModel
      .where('contentGroupId', contentGroupId)
      .where('language', lang);

    const aboutUsEntity = await query.findOne().populate('image').exec();
    if (!aboutUsEntity) {
      throw new NotFoundException(
        `Entity with contentGroupId ${contentGroupId} and language ${lang} not found`,
      );
    }
    return aboutUsEntity;
  }

  // async findByContentGroupId(contentGroupId: Types.ObjectId) {
  // const query = this.aboutUsModel.where('contentGroupId', contentGroupId);

  // const aboutUs = await query.findOne().exec();
  // if (!aboutUs) {
  //   throw new NotFoundException(
  //     `Report with contentGroupId ${contentGroupId} not found`,
  //   );
  // }
  //   return this.aboutUsModel.find({ contentGroupId }).populate('image');
  // }

  async update(
    id: string,
    updateAboutUsDto: UpdateAboutUsDto,
  ): Promise<AboutUs> {
    const update = { $set: updateAboutUsDto };
    const aboutUs = await this.aboutUsModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!aboutUs) {
      throw new NotFoundException(`AboutUs with ID ${id} not found`);
    }
    return aboutUs;
  }

  async updateAll(
    contentGroupId: string,
    updateAboutUsDto: UpdateAboutUsDto,
  ): Promise<AboutUs[]> {
    const update = { $set: updateAboutUsDto };
    const result = await this.aboutUsModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No AboutUs entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.aboutUsModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteAboutUs = await this.aboutUsModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteAboutUs) {
      throw new NotFoundException(`About us with ID ${id} not found`);
    }
    try {
      if (deleteAboutUs.contentGroupId) {
        await this.aboutUsModel
          .deleteMany({ contentGroupId: deleteAboutUs.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteAboutUs.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
