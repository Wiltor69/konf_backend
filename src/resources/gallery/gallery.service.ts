import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Gallery, GalleryDocument } from './entities/gallery.entity';
import { ContentGroupService } from '../content-group/content-group.service';
import { ImageService } from '../image/image.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddImageDto } from './dto/add-image.dto';
import { ELanguage } from '../util/enum';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name)
    private galleryModel: Model<GalleryDocument>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createGalleryDto: CreateGalleryDto) {
    const addImageGalleryDto: AddImageDto = { ...createGalleryDto };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createGalleryDto.contentGroupId,
      createGalleryDto.language,
    );
    const isImage = await this.imageService.findOne(createGalleryDto.imageId);
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageGalleryDto.image = isImage;
    }
    const newMember = new this.galleryModel({
      ...addImageGalleryDto,
      isImage: addImageGalleryDto.image,
      contentGroupId,
    });
    return await newMember.save();
  }

  findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().populate('image');
  }

  async findOne(id: string): Promise<Gallery> {
    const gallery = await this.galleryModel
      .findById(id)
      .populate('image')
      .exec();
    if (!gallery) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return gallery;
  }

  async findByLanguage(language: ELanguage): Promise<Gallery[]> {
    return this.galleryModel.find({ language }).populate('image');
  }

  async update(
    id: string,
    updateGalleryDto: UpdateGalleryDto,
  ): Promise<Gallery> {
    const update = { $set: updateGalleryDto };
    const gallery = await this.galleryModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!gallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }
    return gallery;
  }

  async updateAll(
    contentGroupId: string,
    updateGalleryDto: UpdateGalleryDto,
  ): Promise<Gallery[]> {
    const update = { $set: updateGalleryDto };
    const result = await this.galleryModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Partner entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.galleryModel.find({ contentGroupId }).exec();
  }

  async remove(id: string): Promise<void> {
    const deleteGallery = await this.galleryModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteGallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }
    try {
      if (deleteGallery.contentGroupId) {
        await this.galleryModel
          .deleteMany({ contentGroupId: deleteGallery.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteGallery.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
