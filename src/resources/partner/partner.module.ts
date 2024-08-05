import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '../image/image.module';
import { Partner, PartnerSchema } from './entities/partner.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Partner.name, schema: PartnerSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}
