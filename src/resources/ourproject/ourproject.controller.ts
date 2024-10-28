import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { OurprojectService } from './ourproject.service';
import { CreateOurprojectDto } from './dto/create-ourproject.dto';
import { UpdateOurprojectDto } from './dto/update-ourproject.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('ourproject')
@Controller('ourproject')
export class OurprojectController {
  constructor(private readonly ourprojectService: OurprojectService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createOurprojectDto: CreateOurprojectDto) {
    if (
      createOurprojectDto.contentGroupId &&
      !Types.ObjectId.isValid(createOurprojectDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.ourprojectService.create(createOurprojectDto);
  }

  // @Get()
  // findAll() {
  //   return this.ourprojectService.findAll();
  // }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.ourprojectService.findByLanguage(language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ourprojectService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOurprojectDto: UpdateOurprojectDto,
  ) {
    return this.ourprojectService.update(id, updateOurprojectDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateOurprojectDto: UpdateOurprojectDto,
  ) {
    return await this.ourprojectService.updateAll(
      contentGroupId,
      updateOurprojectDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ourprojectService.remove(id);
  }
}
