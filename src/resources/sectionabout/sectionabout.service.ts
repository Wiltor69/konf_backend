import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionaboutDto } from './dto/create-sectionabout.dto';
import { UpdateSectionaboutDto } from './dto/update-sectionabout.dto';
import {
  Sectionabout,
  SectionaboutDocument,
} from './entities/sectionabout.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { Model } from 'mongoose';
import { AddImageSectionDto } from './dto/add-image-section.dto';

@Injectable()
export class SectionaboutService {
  constructor(
    @InjectModel(Sectionabout.name)
    private sectionaboutModel: Model<SectionaboutDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createSectionaboutDto: CreateSectionaboutDto) {
    const addImageSectionDto: AddImageSectionDto = { ...createSectionaboutDto };

    const isImage = await this.imageService.findOne(
      createSectionaboutDto.imageId,
    );
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageSectionDto.image = isImage;
    }
    const newElement = new this.sectionaboutModel({
      ...addImageSectionDto,
      isImage: addImageSectionDto.image,
    });
    return await newElement.save();
  }

  findAll(): Promise<Sectionabout[]> {
    return this.sectionaboutModel.find().populate('image');
  }

  findOne(id: string): Promise<Sectionabout> {
    return this.sectionaboutModel.findById(id).populate('image');
  }

  update(
    id: string,
    updateSectionaboutDto: UpdateSectionaboutDto,
  ): Promise<Sectionabout> {
    return this.sectionaboutModel.findByIdAndUpdate(id, updateSectionaboutDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Sectionabout> {
    return this.sectionaboutModel.findByIdAndDelete(id);
  }
}
