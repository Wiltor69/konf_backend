import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Partner, PartnerDocument } from './entities/partner.entity';
import { ImageService } from '../image/image.service';
import { Model } from 'mongoose';
import { AddImageDto } from './dto/add-image.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    const addImageDto: AddImageDto = { ...createPartnerDto };

    const isImage = await this.imageService.findOne(
      createPartnerDto.imagePartnerId,
    );
    if (!isImage) {
      throw new NotFoundException('Image not found');
    }
    addImageDto.image = isImage;

    const newHelp = new this.partnerModel({ ...addImageDto });
    return await newHelp.save();
  }

  findAll(): Promise<Partner[]> {
    return this.partnerModel.find().exec();
  }

  findOne(id: string): Promise<Partner> {
    return this.partnerModel.findById(id);
  }

  update(id: string, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
    return this.partnerModel.findByIdAndUpdate(id, updatePartnerDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Partner> {
    return this.partnerModel.findByIdAndDelete(id);
  }
}
