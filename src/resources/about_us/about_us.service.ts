import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';
import { AboutUs, AboutUsDocument } from './entities/about_us.entity';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddImageAboutDto } from './dto/add-image-about.dto';
import { ImageService } from '../image/image.service';
import { ELanguage } from '../util/enum';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUsDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createAboutUsDto: CreateAboutUsDto) {
    const addImageAboutDto: AddImageAboutDto = { ...createAboutUsDto };
    const isImage = await this.imageService.findOne(createAboutUsDto.imageId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageAboutDto.image = isImage;
    }
    const newAbout = new this.aboutUsModel({
      ...addImageAboutDto,
      isImage: addImageAboutDto.image,
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

  remove(id: string): Promise<AboutUs> {
    return this.aboutUsModel.findByIdAndDelete(id);
  }
}
