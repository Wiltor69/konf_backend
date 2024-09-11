import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';
import { ImageService } from '../image/image.service';
import { AddImageProjectDto } from './dto/add-image-project';
import { ELanguage } from '../util/enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private readonly imageService: ImageService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const addImageProjectDto: AddImageProjectDto = {
      ...createProjectDto,
    };
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

  remove(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
