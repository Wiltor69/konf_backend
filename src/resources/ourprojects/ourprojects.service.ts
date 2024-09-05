import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOurprojectDto } from './dto/create-ourproject.dto';
import { UpdateOurprojectDto } from './dto/update-ourproject.dto';
import { Ourproject, OurprojectDocument } from './entities/ourproject.entity';
import { Model } from 'mongoose';
import { ImageService } from '../image/image.service';
import { InjectModel } from '@nestjs/mongoose';
import { AddImageOurprojectDto } from './dto/add-image-ourproject';
import { ELanguage } from '../util/enum';

@Injectable()
export class OurprojectsService {
  constructor(
    @InjectModel(Ourproject.name)
    private ourprojectModel: Model<OurprojectDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createOurprojectDto: CreateOurprojectDto) {
    const addImageOurProjectDto: AddImageOurprojectDto = {
      ...createOurprojectDto,
    };

    const isImage = await this.imageService.findOne(
      createOurprojectDto.imageOuProjectId,
    );
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageOurProjectDto.image = isImage;
    }

    const newOurproject = new this.ourprojectModel({
      ...addImageOurProjectDto,
      isImage: addImageOurProjectDto.image,
    });
    return await newOurproject.save();
  }

  findAll(): Promise<Ourproject[]> {
    return this.ourprojectModel.find().populate('image');
  }

  findOne(id: string): Promise<Ourproject> {
    return this.ourprojectModel.findById(id).populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Ourproject[]> {
    return this.ourprojectModel.find({ language }).populate('image');
  }

  update(id: string, updateOurprojectDto: UpdateOurprojectDto) {
    return this.ourprojectModel.findByIdAndUpdate(id, updateOurprojectDto);
  }

  remove(id: string) {
    return this.ourprojectModel.findByIdAndDelete(id);
  }
}
