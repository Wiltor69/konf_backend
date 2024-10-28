import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class SectionaboutService {
  constructor(
    @InjectModel(Sectionabout.name)
    private sectionaboutModel: Model<SectionaboutDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createSectionaboutDto: CreateSectionaboutDto) {
    const addImageSectionDto: AddImageSectionDto = { ...createSectionaboutDto };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createSectionaboutDto.contentGroupId,
      createSectionaboutDto.language,
    );
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
      contentGroupId,
    });
    return await newElement.save();
  }

  findAll(): Promise<Sectionabout[]> {
    return this.sectionaboutModel.find().populate('image');
  }

  async findOne(id: string): Promise<Sectionabout> {
    const sectionabout = await this.sectionaboutModel
      .findById(id)
      .populate('image')
      .exec();
    if (!sectionabout) {
      throw new NotFoundException(`Sectionabout with ID ${id} not found`);
    }
    return sectionabout;
  }

  async findByLanguage(language: ELanguage): Promise<Sectionabout[]> {
    return this.sectionaboutModel.find({ language }).populate('image');
  }

  async update(
    id: string,
    updateSectionaboutDto: UpdateSectionaboutDto,
  ): Promise<Sectionabout> {
    const update = { $set: updateSectionaboutDto };
    const sectionabout = await this.sectionaboutModel.findByIdAndUpdate(
      id,
      update,
      { new: true },
    );
    if (!sectionabout) {
      throw new NotFoundException(`Sectionabout with ID ${id} not found`);
    }
    return sectionabout;
  }

  async updateAll(
    contentGroupId: string,
    updateSectionaboutDto: UpdateSectionaboutDto,
  ): Promise<Sectionabout[]> {
    const update = { $set: updateSectionaboutDto };
    const result = await this.sectionaboutModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Sectionabout entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.sectionaboutModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteSectionAboutUs = await this.sectionaboutModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteSectionAboutUs) {
      throw new NotFoundException(`Section About us with ID ${id} not found`);
    }
    try {
      if (deleteSectionAboutUs.contentGroupId) {
        await this.sectionaboutModel
          .deleteMany({ contentGroupId: deleteSectionAboutUs.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(
          deleteSectionAboutUs.contentGroupId,
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
