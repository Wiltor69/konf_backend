import { Module } from '@nestjs/common';
import { ContentGroupService } from './content-group.service';
import { ContentGroupController } from './content-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContentGroup,
  ContentGroupSchema,
} from './entities/content-group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContentGroup.name, schema: ContentGroupSchema },
    ]),
  ],
  controllers: [ContentGroupController],
  providers: [ContentGroupService],
  exports: [ContentGroupService],
})
export class ContentGroupModule {}
