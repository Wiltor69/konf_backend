import { Module } from '@nestjs/common';
import { HelpService } from './help.service';
import { HelpController } from './help.controller';
import { ImageModule } from '../image/image.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Help, HelpSchema } from './entities/help.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Help.name, schema: HelpSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],
  controllers: [HelpController],
  providers: [HelpService],
  exports: [HelpService],
})
export class HelpModule {}
