import { Module } from '@nestjs/common';
import { SectionaboutService } from './sectionabout.service';
import { SectionaboutController } from './sectionabout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Sectionabout,
  SectionaboutSchema,
} from './entities/sectionabout.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sectionabout.name, schema: SectionaboutSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],

  controllers: [SectionaboutController],
  providers: [SectionaboutService],
  exports: [SectionaboutService],
})
export class SectionaboutModule {}
