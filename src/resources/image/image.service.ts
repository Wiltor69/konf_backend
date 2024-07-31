import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Image, ImageDocument } from './entities/image.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createImageDto: CreateImageDto, file: Express.Multer.File) {
    const uploadImage: UploadImageDto = {
      ...createImageDto,
    };
    try {
      if (file) {
        const img = await this.cloudinary.uploadImage(file).catch((e) => {
          throw new InternalServerErrorException(
            'Failed to upload image to Cloudinary',
          );
        });

        if (img) {
          uploadImage.url = img.url;
        }
      }
      const image = new this.imageModel({ ...uploadImage });
      await image.save();
      return image;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error uploading image: ${error.message}`,
      );
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
