import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOurprojectDto } from './dto/create-ourproject.dto';
import { UpdateOurprojectDto } from './dto/update-ourproject.dto';
import { Ourproject } from './entities/ourproject.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageService } from '../image/image.service';
import { AddImageOurProjectDto } from './dto/add-image-ourproject';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class OurprojectService {
  constructor(
    @InjectModel(Ourproject.name) private ourprojectModel: Model<Ourproject>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createOurprojectDto: CreateOurprojectDto) {
    const addImageOurProjectDto: AddImageOurProjectDto = {
      ...createOurprojectDto,
    };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createOurprojectDto.contentGroupId,
      createOurprojectDto.language,
    );
    const isImage = await this.imageService.findOne(
      createOurprojectDto.imageOurProjectId,
    );
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageOurProjectDto.image = isImage;
    }

    const newOurProject = new this.ourprojectModel({
      ...addImageOurProjectDto,
      isImage: addImageOurProjectDto.image,
      contentGroupId,
    });
    return await newOurProject.save();
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
    return this.ourprojectModel.findByIdAndUpdate(id, updateOurprojectDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    const deleteOurProject = await this.ourprojectModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteOurProject) {
      throw new NotFoundException(`Our project with ID ${id} not found`);
    }
    try {
      if (deleteOurProject.contentGroupId) {
        await this.ourprojectModel
          .deleteMany({ contentGroupId: deleteOurProject.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(
          deleteOurProject.contentGroupId,
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
