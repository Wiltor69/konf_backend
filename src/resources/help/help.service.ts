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

  findOne(id: string): Promise<Help> {
    return this.helpModel.findById(id).populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Help[]> {
    return this.helpModel.find({ language }).populate('image');
  }

  update(id: string, updateHelpDto: UpdateHelpDto): Promise<Help> {
    return this.helpModel.findByIdAndUpdate(id, updateHelpDto, {
      new: true,
    });
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
