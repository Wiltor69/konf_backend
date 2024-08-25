import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member, MemberDocument } from './entities/member.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { Model } from 'mongoose';
import { AddImageMemberDto } from './dto/add-image-member.dto';
import { ELanguage } from '../util/enum';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const addImageMemberDto: AddImageMemberDto = { ...createMemberDto };
    const isImage = await this.imageService.findOne(createMemberDto.imageId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageMemberDto.image = isImage;
    }
    const newMember = new this.memberModel({
      ...addImageMemberDto,
      isImage: addImageMemberDto.image,
    });
    return await newMember.save();
  }

  findAll(): Promise<Member[]> {
    return this.memberModel.find().populate('image');
  }

  findOne(id: string): Promise<Member> {
    return this.memberModel.findById(id).populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Member[]> {
    return this.memberModel.find({ language }).populate('image');
  }

  update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberModel.findByIdAndUpdate(id, updateMemberDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Member> {
    return this.memberModel.findByIdAndDelete(id);
  }
}
