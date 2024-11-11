import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Partner, PartnerDocument } from './entities/partner.entity';
import { ImageService } from '../image/image.service';
import { Model, Types } from 'mongoose';
import { AddImageDto } from './dto/add-image.dto';
import { ELanguage } from '../util/enum';

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
    } else {
      addImageDto.image = isImage;
    }

    const newHelp = new this.partnerModel({
      ...addImageDto,
      isImage: addImageDto.image,
    });
    return await newHelp.save();
  }

  findAll(): Promise<Partner[]> {
    return this.partnerModel.find().populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Partner[]> {
    return this.partnerModel.find({ language }).populate('image');
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.partnerModel
      .findById(id)
      .populate('image')
      .exec();
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  async findOneByLanguageAndContentGroupId(
    contentGroupId: Types.ObjectId,
    lang: ELanguage,
  ) {
    const query = this.partnerModel
      .where('contentGroupId', contentGroupId)
      .where('language', lang);

    const partner = await query.findOne().populate('image').exec();
    if (!partner) {
      throw new NotFoundException(
        `Entity with contentGroupId ${contentGroupId} and language ${lang} not found`,
      );
    }
    return partner;
  }

  async update(
    id: string,
    updatePartnerDto: UpdatePartnerDto,
  ): Promise<Partner> {
    const update = { $set: updatePartnerDto };
    const partner = await this.partnerModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  async updateAll(
    contentGroupId: string,
    updatePartnerDto: UpdatePartnerDto,
  ): Promise<Partner[]> {
    const update = { $set: updatePartnerDto };
    const result = await this.partnerModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Partner entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.partnerModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<Partner> {
    const partner = await this.partnerModel.findByIdAndDelete(id);
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }
  
}
