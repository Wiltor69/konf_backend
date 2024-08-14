import { Module } from '@nestjs/common';
import { HeroaboutService } from './heroabout.service';
import { HeroaboutController } from './heroabout.controller';
import { Heroabout, HeroaboutSchema } from './entities/heroabout.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Heroabout.name, schema: HeroaboutSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],
  controllers: [HeroaboutController],
  providers: [HeroaboutService],
  exports: [HeroaboutService],
})
export class HeroaboutModule {}
