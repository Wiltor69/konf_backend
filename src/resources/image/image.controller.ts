import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  FileTypeValidator,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Types } from 'mongoose';
@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createImage(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/(jpeg|png|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const res = this.imageService.create(createImageDto, file);
    return res;
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid imageId ${id}`);
    } else {
      try {
        const result = await this.imageService.remove(id);
        return res.status(HttpStatus.OK).json({
          message: 'File deleted successfully',
          result,
        });
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Failed to delete file',
          error: error.message,
        });
      }
    }
  }
}
