import { Module } from '@nestjs/common';
import { AboutUsService } from './about_us.service';
import { AboutUsController } from './about_us.controller';
import { AboutUs, AboutUsSchema } from './entities/about_us.entity';

import { MongooseModule } from '@nestjs/mongoose';

import { ImageSchema, Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AboutUs.name, schema: AboutUsSchema },

      { name: Image.name, schema: ImageSchema },
    ]),

    ImageModule,
    ContentGroupModule,
  ],

  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
