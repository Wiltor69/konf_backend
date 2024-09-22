import { Module } from '@nestjs/common';
import { HelpService } from './help.service';
import { HelpController } from './help.controller';
import { ImageModule } from '../image/image.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Help, HelpSchema } from './entities/help.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Help.name, schema: HelpSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
    ContentGroupModule,
  ],
  controllers: [HelpController],
  providers: [HelpService],
  exports: [HelpService],
})
export class HelpModule {}
