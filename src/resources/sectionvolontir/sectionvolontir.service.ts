import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class SectionvolontirService {
  constructor(
    @InjectModel(Sectionvolontir.name)
    private sectionvolontirModel: Model<SectionvolontirDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createSectionvolontirDto: CreateSectionvolontirDto) {
    const addImageSectionvolontirDto: AddImageSectionvolontirDto = {
      ...createSectionvolontirDto,
    };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createSectionvolontirDto.contentGroupId,
      createSectionvolontirDto.language,
    );
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
      contentGroupId,
    });
    return await newSectionVolontir.save();
  }

  findAll(): Promise<Sectionvolontir[]> {
    return this.sectionvolontirModel.find().populate('image');
  }

  async findOne(id: string): Promise<Sectionvolontir> {
    const sectionvolontir = await this.sectionvolontirModel
      .findById(id)
      .populate('image')
      .exec();
    if (!sectionvolontir) {
      throw new NotFoundException(`Sectionvolontir with ID ${id} not found`);
    }
    return sectionvolontir;
  }

  async findByLanguage(language: ELanguage): Promise<Sectionvolontir[]> {
    return this.sectionvolontirModel.find({ language }).populate('image');
  }

  async update(
    id: string,
    updateSectionvolontirDto: UpdateSectionvolontirDto,
  ): Promise<Sectionvolontir> {
    const update = { $set: updateSectionvolontirDto };
    const sectionvolontir = await this.sectionvolontirModel.findByIdAndUpdate(
      id,
      update,
      { new: true },
    );
    if (!sectionvolontir) {
      throw new NotFoundException(`Sectionvolontir with ID ${id} not found`);
    }
    return sectionvolontir;
  }

  async updateAll(
    contentGroupId: string,
    updateSectionvolontirDto: UpdateSectionvolontirDto,
  ): Promise<Sectionvolontir[]> {
    const update = { $set: updateSectionvolontirDto };
    const result = await this.sectionvolontirModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Sectionvolontir entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.sectionvolontirModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteSectionVolontir = await this.sectionvolontirModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteSectionVolontir) {
      throw new NotFoundException(`Section Volontir with ID ${id} not found`);
    }
    try {
      if (deleteSectionVolontir.contentGroupId) {
        await this.sectionvolontirModel
          .deleteMany({ contentGroupId: deleteSectionVolontir.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(
          deleteSectionVolontir.contentGroupId,
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
