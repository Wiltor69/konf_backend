import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';
import { AboutUs, AboutUsDocument } from './entities/about_us.entity';
import { HeroaboutService } from '../heroabout/heroabout.service';
import { SectionaboutService } from '../sectionabout/sectionabout.service';
import { MemberService } from '../member/member.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddAllAboutDto } from './dto/add-all-about.dto';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUsDocument>,
    private readonly heroAboutService: HeroaboutService,
    private readonly sectionAboutService: SectionaboutService,
    private readonly memberService: MemberService,
  ) {}

  async create(createAboutUsDto: CreateAboutUsDto) {
    const addallaboutDto: AddAllAboutDto = { ...createAboutUsDto };

    const heroAbout = await this.heroAboutService.findAll();
    const sectionAbout = await this.sectionAboutService.findAll();
    const member = await this.memberService.findAll();

    if (!heroAbout) {
      throw new NotFoundException('HeroAbout not found');
    } else {
      addallaboutDto.heroAbout = heroAbout;
    }
    if (!sectionAbout) {
      throw new NotFoundException('SectionAbout not found');
    } else {
      addallaboutDto.sectionAbout = sectionAbout;
    }
    if (!member) {
      throw new NotFoundException('Member not found');
    } else {
      addallaboutDto.member = member;
    }

    const newAboutUs = new this.aboutUsModel({
      ...addallaboutDto,
    });
    return await newAboutUs.save();
  }

  findAll(): Promise<AboutUs[]> {
    return this.aboutUsModel
      .find()
      .populate(['heroAbout', 'sectionAbout', 'member']);
  }

  findOne(id: string): Promise<AboutUs> {
    return this.aboutUsModel
      .findById(id)
      .populate(['heroAbout', 'sectionAbout', 'member']);
  }

  update(id: string, updateAboutUsDto: UpdateAboutUsDto): Promise<AboutUs> {
    return this.aboutUsModel.findByIdAndUpdate(id, updateAboutUsDto, {
      new: true,
    });
  }

  remove(id: string): Promise<AboutUs> {
    return this.aboutUsModel.findByIdAndDelete(id);
  }
}
