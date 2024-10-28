import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { ImageService } from '../image/image.service';
import { Help, HelpDocument } from './entities/help.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddImageHelpDto } from './dto/add-image-help.dto';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class HelpService {
  constructor(
    @InjectModel(Help.name) private helpModel: Model<HelpDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createHelpDto: CreateHelpDto) {
    const addImageHelpDto: AddImageHelpDto = { ...createHelpDto };

    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createHelpDto.contentGroupId,
      createHelpDto.language,
    );

    const isImage = await this.imageService.findOne(createHelpDto.imageHelpId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageHelpDto.image = isImage;
    }

    const newHelp = new this.helpModel({
      ...addImageHelpDto,
      isImage: addImageHelpDto.image,
      contentGroupId,
    });
    return await newHelp.save();
  }

  findAll(): Promise<Help[]> {
    return this.helpModel.find().populate('image');
  }

  async findOne(id: string): Promise<Help> {
    const help = await this.helpModel.findById(id).populate('image').exec();
    if (!help) {
      throw new NotFoundException(`Help with ID ${id} not found`);
    }
    return help;
  }

  async findByLanguage(language: ELanguage): Promise<Help[]> {
    return this.helpModel.find({ language }).populate('image');
  }

  async update(id: string, updateHelpDto: UpdateHelpDto): Promise<Help> {
    const update = { $set: updateHelpDto };
    const help = await this.helpModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!help) {
      throw new NotFoundException(`Help with ID ${id} not found`);
    }
    return help;
  }

  async updateAll(
    contentGroupId: string,
    updateHelpDto: UpdateHelpDto,
  ): Promise<Help[]> {
    const update = { $set: updateHelpDto };
    const result = await this.helpModel.updateMany({ contentGroupId }, update);
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Help entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.helpModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteHelp = await this.helpModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteHelp) {
      throw new NotFoundException(`Help with ID ${id} not found`);
    }
    try {
      if (deleteHelp.contentGroupId) {
        await this.helpModel
          .deleteMany({ contentGroupId: deleteHelp.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteHelp.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
