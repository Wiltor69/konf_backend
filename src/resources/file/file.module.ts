import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema, File } from './entities/file.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  controllers: [FilesController],
  providers: [FileService],
})
export class FileModule {}
