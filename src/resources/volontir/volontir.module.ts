import { Module } from '@nestjs/common';
import { VolontirService } from './volontir.service';
import { VolontirController } from './volontir.controller';
import { Volontir, VolontirSchema } from './entities/volontir.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Volontir.name, schema: VolontirSchema },

      { name: Image.name, schema: ImageSchema },
    ]),

    ImageModule,
  ],
  controllers: [VolontirController],
  providers: [VolontirService],
})
export class VolontirModule {}
