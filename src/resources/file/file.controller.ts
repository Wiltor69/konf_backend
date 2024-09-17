import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('file')
@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FileService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const fileInfo = await this.filesService.uploadFile(file);
  //   return {
  //     status: HttpStatus.OK,
  //     message: 'File uploaded successfully',
  //     data: fileInfo,
  //   };
  // }

  @Get(':fileId')
  async getFile(@Param('fileId') fileId: string) {
    const file = await this.filesService.getFileById(fileId);
    return {
      status: HttpStatus.OK,
      data: file,
    };
  }

  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    await this.filesService.deleteFileById(fileId);
    return {
      status: HttpStatus.OK,
      message: 'File deleted successfully',
    };
  }

  @Get()
  async findAllFiles() {
    const files = await this.filesService.findAllFiles();
    return {
      status: HttpStatus.OK,
      data: files,
    };
  }
}
