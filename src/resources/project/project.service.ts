import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';
import { ImageService } from '../image/image.service';
import { AddImageProjectDto } from './dto/add-image-project';
import { ELanguage } from '../util/enum';
import { ContentGroupService } from '../content-group/content-group.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly imageService: ImageService,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const addImageProjectDto: AddImageProjectDto = {
      ...createProjectDto,
    };
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createProjectDto.contentGroupId,
      createProjectDto.language,
    );
    const isImage = await this.imageService.findOne(
      createProjectDto.imageProjectId,
    );
    if (!isImage) {
      throw new NotFoundException('Image not found');
    } else {
      addImageProjectDto.image = isImage;
    }
    const newProject = new this.projectModel({
      ...addImageProjectDto,
      isImage: addImageProjectDto.image,
      contentGroupId,
    });
    return await newProject.save();
  }

  findAll(): Promise<Project[]> {
    return this.projectModel.find().populate('image');
  }

  findOne(id: string): Promise<Project> {
    return this.projectModel.findById(id).populate('image');
  }

  async findByLanguage(language: ELanguage): Promise<Project[]> {
    return this.projectModel.find({ language }).populate('image');
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return (
      this.projectModel.findByIdAndUpdate(id, updateProjectDto), { new: true }
    );
  }

  async remove(id: string): Promise<void> {
    const deleteProject = await this.projectModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    try {
      if (deleteProject.contentGroupId) {
        await this.projectModel
          .deleteMany({ contentGroupId: deleteProject.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteProject.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
