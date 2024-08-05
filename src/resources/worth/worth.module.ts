import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorthService } from './worth.service';
import { WorthController } from './worth.controller';
import { Worth, WorthSchema } from './entities/worth.entity';

@Module({
  controllers: [WorthController],
  providers: [WorthService],
  imports: [
    MongooseModule.forFeature([{ name: Worth.name, schema: WorthSchema }]),
  ],
  exports: [WorthService],
})
export class WorthModule {}
