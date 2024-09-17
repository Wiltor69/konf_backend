import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionvolontirDto } from './dto/create-sectionvolontir.dto';
import { UpdateSectionvolontirDto } from './dto/update-sectionvolontir.dto';
import {
  Sectionvolontir,
  SectionvolontirDocument,
} from './entities/sectionvolontir.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { Model } from 'mongoose';
import { AddImageSectionvolontirDto } from './dto/add-image-sectionvolontir';
import { ELanguage } from '../util/enum';

@Injectable()
export class SectionvolontirService {
  constructor(
    @InjectModel(Sectionvolontir.name)
    private sectionvolontirModel: Model<SectionvolontirDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createSectionvolontirDto: CreateSectionvolontirDto) {
    const addImageSectionvolontirDto: AddImageSectionvolontirDto = {
      ...createSectionvolontirDto,
    };
    const isImage = await this.imageService.findOne(
      createSectionvolontirDto.imageId,
    );
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageSectionvolontirDto.image = isImage;
    }
    const newSectionVolontir = new this.sectionvolontirModel({
      ...addImageSectionvolontirDto,
      isImage: addImageSectionvolontirDto.image,
    });
    return await newSectionVolontir.save();
  }

  findAll(): Promise<Sectionvolontir[]> {
    return this.sectionvolontirModel.find().populate('image');
  }

  findOne(id: string): Promise<Sectionvolontir> {
    return this.sectionvolontirModel.findById(id).populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Sectionvolontir[]> {
    return this.sectionvolontirModel.find({ language }).populate('image');
  }

  update(
    id: string,
    updateSectionvolontirDto: UpdateSectionvolontirDto,
  ): Promise<Sectionvolontir> {
    return this.sectionvolontirModel.findByIdAndUpdate(
      id,
      updateSectionvolontirDto,
      { new: true },
    );
  }

  remove(id: string): Promise<Sectionvolontir> {
    return this.sectionvolontirModel.findByIdAndDelete(id);
  }
}
