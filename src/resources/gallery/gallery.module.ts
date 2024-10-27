import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { Gallery, GallerySchema } from './entities/gallery.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '../image/image.module';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Gallery.name, schema: GallerySchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
    ContentGroupModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService]
})
export class GalleryModule {}
