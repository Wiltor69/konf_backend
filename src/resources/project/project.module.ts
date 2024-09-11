import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ImageModule } from '../image/image.module';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { Project, ProjectSchema } from './entities/project.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
