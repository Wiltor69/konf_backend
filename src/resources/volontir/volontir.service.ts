import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVolontirDto } from './dto/create-volontir.dto';
import { UpdateVolontirDto } from './dto/update-volontir.dto';
import { Volontir, VolontirDocument } from './entities/volontir.entity';
import { Model } from 'mongoose';
import { ImageService } from '../image/image.service';
import { InjectModel } from '@nestjs/mongoose';
import { AddImageVolontirDto } from './dto/add-image-volontir';
import { ELanguage } from '../util/enum';

@Injectable()
export class VolontirService {
  constructor(
    @InjectModel(Volontir.name) private volontirModel: Model<VolontirDocument>,
    private readonly imageService: ImageService,
  ) {}
  async create(createVolontirDto: CreateVolontirDto) {
    const addImageVolontirDto: AddImageVolontirDto = { ...createVolontirDto };
    const isImage = await this.imageService.findOne(createVolontirDto.imageId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageVolontirDto.image = isImage;
    }
    const newVolontir = new this.volontirModel({
      ...addImageVolontirDto,
      isImage: addImageVolontirDto.image,
    });
    return await newVolontir.save();
  }

  findAll(): Promise<Volontir[]> {
    return this.volontirModel.find().populate('image');
  }

  findOne(id: string): Promise<Volontir> {
    return this.volontirModel.findById(id).populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Volontir[]> {
    return this.volontirModel.find({ language }).populate('image');
  }

  update(id: string, updateVolontirDto: UpdateVolontirDto) {
    return this.volontirModel.findByIdAndUpdate(id, updateVolontirDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.volontirModel.findByIdAndDelete(id);
  }
}
