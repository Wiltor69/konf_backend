import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHeroaboutDto } from './dto/create-heroabout.dto';
import { UpdateHeroaboutDto } from './dto/update-heroabout.dto';
import { Heroabout, HeroaboutDocument } from './entities/heroabout.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ImageService } from '../image/image.service';
import { AddImageHeroDto } from './dto/add-image-hero.dto';
import { Model } from 'mongoose';

@Injectable()
export class HeroaboutService {
  constructor(
    @InjectModel(Heroabout.name)
    private heroaboutModel: Model<HeroaboutDocument>,
    private readonly imageService: ImageService,
  ) {}

  async create(createHeroaboutDto: CreateHeroaboutDto) {
    const addImageHeroDto: AddImageHeroDto = { ...createHeroaboutDto };

    const isImage = await this.imageService.findOne(createHeroaboutDto.imageId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageHeroDto.image = isImage;
    }
    const newHero = new this.heroaboutModel({
      ...addImageHeroDto,
      isImage: addImageHeroDto.image,
    });
    return await newHero.save();
  }

  findAll(): Promise<Heroabout[]> {
    return this.heroaboutModel.find().populate('image');
  }

  findOne(id: string): Promise<Heroabout> {
    return this.heroaboutModel.findById(id).populate('image');
  }

  update(
    id: string,
    updateHeroaboutDto: UpdateHeroaboutDto,
  ): Promise<Heroabout> {
    return this.heroaboutModel.findByIdAndUpdate(id, updateHeroaboutDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Heroabout> {
    return this.heroaboutModel.findByIdAndDelete(id);
  }
}
