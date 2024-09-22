import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Body,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';

@ApiTags('file')
@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FileService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'pdf' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const res = this.filesService.uploadFile(createFileDto, file);
    return res;

    // const fileInfo = await this.filesService.uploadFile(createFileDto, file);
    // return {
    //   status: HttpStatus.OK,
    //   message: 'File uploaded successfully',
    //   data: fileInfo,
    // };
  }

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
