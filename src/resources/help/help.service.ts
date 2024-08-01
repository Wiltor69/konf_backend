import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { ImageService } from '../image/image.service';
import { Help, HelpDocument } from './entities/help.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HelpService {
  constructor(
    @InjectModel(Help.name) private helpModel: Model<HelpDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createHelpDto: CreateHelpDto): Promise<Help> {
    const isImage = await this.imageService.findOne(createHelpDto.imageHelp);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    }
    const newHelp = new this.helpModel(createHelpDto);
    return await newHelp.save();
  }

  findAll(): Promise<Help[]> {
    return this.helpModel.find().exec();
  }

  findOne(id: string): Promise<Help> {
    return this.helpModel.findById(id);
  }

  update(id: string, updateHelpDto: UpdateHelpDto): Promise<Help> {
    return this.helpModel.findByIdAndUpdate(id, updateHelpDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Help> {
    return this.helpModel.findByIdAndDelete(id);
  }
}
