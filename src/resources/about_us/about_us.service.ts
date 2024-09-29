import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';
import { AboutUs, AboutUsDocument } from './entities/about_us.entity';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddImageAboutDto } from './dto/add-image-about.dto';
import { ImageService } from '../image/image.service';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUsDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createAboutUsDto: CreateAboutUsDto) {
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

  findOne(id: string): Promise<AboutUs> {
    return this.aboutUsModel.findById(id).populate('image');
  }
  async findByLanguage(language: ELanguage): Promise<AboutUs[]> {
    return this.aboutUsModel.find({ language }).populate('image');
  }

  update(id: string, updateAboutUsDto: UpdateAboutUsDto): Promise<AboutUs> {
    return this.aboutUsModel.findByIdAndUpdate(id, updateAboutUsDto, {
      new: true,
    });
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
