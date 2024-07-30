import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Image, ImageDocument } from './entities/image.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const { file, url } = createImageDto;
    try {
      const urlImg = await this.imageModel.findOne({ url: url });
      if (urlImg) {
        throw new BadRequestException('URL already exists');
      }
      if (file) {
        const img = await this.cloudinary.uploadImage(file).catch((e) => {
          throw new BadRequestException(e.message);
        });
        if (img) {
          createImageDto.url = img.url;
        }
      }
      const image = new this.imageModel({ ...createImageDto });
      await image.save();
      return image;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  findOne(id: string): Promise<Image> {
    return this.imageModel.findById(id);
  }

  remove(id: string): Promise<Image> {
    return this.imageModel.findByIdAndDelete(id);
  }
}
