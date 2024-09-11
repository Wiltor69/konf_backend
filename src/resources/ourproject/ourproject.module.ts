import { Module } from '@nestjs/common';
import { OurprojectService } from './ourproject.service';
import { OurprojectController } from './ourproject.controller';
import { Ourproject, OurprojectSchema } from './entities/ourproject.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ourproject.name, schema: OurprojectSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],

  controllers: [OurprojectController],
  providers: [OurprojectService],
  exports: [OurprojectService],
})
export class OurprojectModule {}
