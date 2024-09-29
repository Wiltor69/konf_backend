import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVolontirDto } from './dto/create-volontir.dto';
import { UpdateVolontirDto } from './dto/update-volontir.dto';
import { Volontir, VolontirDocument } from './entities/volontir.entity';
import { Model } from 'mongoose';
import { ImageService } from '../image/image.service';
import { InjectModel } from '@nestjs/mongoose';
import { AddImageVolontirDto } from './dto/add-image-volontir';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class VolontirService {
  constructor(
    @InjectModel(Volontir.name) private volontirModel: Model<VolontirDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}
  async create(createVolontirDto: CreateVolontirDto) {
    const addImageVolontirDto: AddImageVolontirDto = { ...createVolontirDto };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createVolontirDto.contentGroupId,
      createVolontirDto.language,
    );
    const isImage = await this.imageService.findOne(createVolontirDto.imageId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageVolontirDto.image = isImage;
    }
    const newVolontir = new this.volontirModel({
      ...addImageVolontirDto,
      isImage: addImageVolontirDto.image,
      contentGroupId,
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

  async remove(id: string): Promise<void> {
    const deleteVolontir = await this.volontirModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteVolontir) {
      throw new NotFoundException(`Volontir with ID ${id} not found`);
    }
    try {
      if (deleteVolontir.contentGroupId) {
        await this.volontirModel
          .deleteMany({ contentGroupId: deleteVolontir.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(
          deleteVolontir.contentGroupId,
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
