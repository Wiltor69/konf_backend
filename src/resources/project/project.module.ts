import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ImageModule } from '../image/image.module';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { Project, ProjectSchema } from './entities/project.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
    ContentGroupModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
