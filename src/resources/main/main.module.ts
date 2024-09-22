import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { Main, MainSchema } from './entities/main.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Main.name, schema: MainSchema }]),
    ContentGroupModule,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
