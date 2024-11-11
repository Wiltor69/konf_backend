import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ELanguage } from '../util/enum';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProjectDto: CreateProjectDto) {
    if (
      createProjectDto.contentGroupId &&
      !Types.ObjectId.isValid(createProjectDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.projectService.create(createProjectDto);
  }

  // @Get()
  // findAll() {
  //   return this.projectService.findAll();
  // }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.projectService.findByLanguage(language);
  }

  @Get(':lang/:contentGroupId')
  async findOneByLanguageAndContentGroupId(
    @Param('contentGroupId') contentGroupId: string,
    @Param('lang') lang: ELanguage,
  ) {
    if (!Types.ObjectId.isValid(contentGroupId)) {
      throw new BadRequestException('Invalid contentGroupId');
    }
    const objectId = new Types.ObjectId(contentGroupId);
    return this.projectService.findOneByLanguageAndContentGroupId(
      objectId,
      lang,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.updateAll(
      contentGroupId,
      updateProjectDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
