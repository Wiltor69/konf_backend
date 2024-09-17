import { Module } from '@nestjs/common';
import { SectionvolontirService } from './sectionvolontir.service';
import { SectionvolontirController } from './sectionvolontir.controller';
import {
  Sectionvolontir,
  SectionvolontirSchema,
} from './entities/sectionvolontir.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sectionvolontir.name, schema: SectionvolontirSchema },

      { name: Image.name, schema: ImageSchema },
    ]),

    ImageModule,
  ],
  controllers: [SectionvolontirController],
  providers: [SectionvolontirService],
})
export class SectionvolontirModule {}
