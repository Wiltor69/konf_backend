import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOurprojectDto } from './dto/create-ourproject.dto';
import { UpdateOurprojectDto } from './dto/update-ourproject.dto';
import { Ourproject } from './entities/ourproject.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async findOne(id: string): Promise<Ourproject> {
    const ourproject = await this.ourprojectModel
      .findById(id)
      .populate('image')
      .exec();
    if (!ourproject) {
      throw new NotFoundException(`Ourproject with ID ${id} not found`);
    }
    return ourproject;
  }

  async findByLanguage(language: ELanguage): Promise<Ourproject[]> {
    return this.ourprojectModel.find({ language }).populate('image');
  }

  async findOneByLanguageAndContentGroupId(
    contentGroupId: Types.ObjectId,
    lang: ELanguage,
  ) {
    const query = this.ourprojectModel
      .where('contentGroupId', contentGroupId)
      .where('language', lang);

    const ourproject = await query.findOne().populate('image').exec();
    if (!ourproject) {
      throw new NotFoundException(
        `Entity with contentGroupId ${contentGroupId} and language ${lang} not found`,
      );
    }
    return ourproject;
  }

  async update(id: string, updateOurprojectDto: UpdateOurprojectDto) {
    const update = { $set: updateOurprojectDto };
    const ourproject = await this.ourprojectModel.findByIdAndUpdate(
      id,
      update,
      {
        new: true,
      },
    );
    if (!ourproject) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return ourproject;
  }

  async updateAll(
    contentGroupId: string,
    updateOurprojectDto: UpdateOurprojectDto,
  ): Promise<Ourproject[]> {
    const update = { $set: updateOurprojectDto };
    const result = await this.ourprojectModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Ourproject entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.ourprojectModel.find({ contentGroupId }).exec();
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
