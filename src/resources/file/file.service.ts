import { Injectable } from '@nestjs/common';
// import * as Grid from 'gridfs-stream';
import * as fs from 'fs';
// import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument, File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async uploadFile(
    createFileDto: CreateFileDto,
    file: Express.Multer.File,
  ): Promise<File> {
    const fileContent = fs.readFileSync(file.path, 'utf-8');

    const newFile = new this.fileModel({
      filename: file.originalname,
      content: fileContent,
    });

    return newFile.save();
  }
  async getFileById(fileId: string): Promise<File> {
    return this.fileModel.findById(fileId).exec();
  }

  async deleteFileById(fileId: string): Promise<void> {
    await this.fileModel.findByIdAndDelete(fileId).exec();
  }

  async findAllFiles(): Promise<File[]> {
    return this.fileModel.find().exec();
  }
}
