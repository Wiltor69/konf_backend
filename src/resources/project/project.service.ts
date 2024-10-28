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

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate('image')
      .exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async findByLanguage(language: ELanguage): Promise<Project[]> {
    return this.projectModel.find({ language }).populate('image');
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const update = { $set: updateProjectDto };
    const project = await this.projectModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!project) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return project;
  }

  async updateAll(
    contentGroupId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project[]> {
    const update = { $set: updateProjectDto };
    const result = await this.projectModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Project entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.projectModel.find({ contentGroupId }).exec();
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
