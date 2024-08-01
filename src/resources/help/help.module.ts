import { Module } from '@nestjs/common';
import { HelpService } from './help.service';
import { HelpController } from './help.controller';
import { ImageModule } from '../image/image.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Help, HelpSchema } from './entities/help.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Help.name, schema: HelpSchema }]),
    ImageModule,
  ],
  controllers: [HelpController],
  providers: [HelpService],
})
export class HelpModule {}
