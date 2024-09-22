import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorthService } from './worth.service';
import { WorthController } from './worth.controller';
import { Worth, WorthSchema } from './entities/worth.entity';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  controllers: [WorthController],
  providers: [WorthService],
  imports: [
    MongooseModule.forFeature([{ name: Worth.name, schema: WorthSchema }]),
    ContentGroupModule,
  ],
  exports: [WorthService],
})
export class WorthModule {}
