import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ELanguage } from '../util/enum';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createGalleryDto: CreateGalleryDto) {
    if (
      createGalleryDto.contentGroupId &&
      !Types.ObjectId.isValid(createGalleryDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.galleryService.create(createGalleryDto);
  }

  // @Get()
  // findAll() {
  //   return this.galleryService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.galleryService.findByLanguage(language);
  }

  @Get(':lang/:contentGroupId')
  async findOneByLanguageAndContentGroupId(
    @Param('contentGroupId') contentGroupId: string,
    @Param('lang') lang: ELanguage,
  ) {
    if (!Types.ObjectId.isValid(contentGroupId)) {
      throw new BadRequestException('Invalid contentGroupId');
    }
    const objectId = new Types.ObjectId(contentGroupId);
    return this.galleryService.findOneByLanguageAndContentGroupId(
      objectId,
      lang,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(id, updateGalleryDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return await this.galleryService.updateAll(
      contentGroupId,
      updateGalleryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
} 
