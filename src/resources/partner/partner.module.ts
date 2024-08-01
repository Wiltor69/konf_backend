import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '../image/image.module';
import { Partner, PartnerSchema } from './entities/partner.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
    ImageModule,
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}
