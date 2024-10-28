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
import { AboutUsService } from './about_us.service';
import { CreateAboutUsDto } from './dto/create-about_us.dto';
import { UpdateAboutUsDto } from './dto/update-about_us.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('about-us')
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAboutUsDto: CreateAboutUsDto) {
    if (
      createAboutUsDto.contentGroupId &&
      !Types.ObjectId.isValid(createAboutUsDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.aboutUsService.create(createAboutUsDto);
  }

  // @Get()
  // findAll() {
  //   return this.aboutUsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutUsService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.aboutUsService.findByLanguage(language);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.update(id, updateAboutUsDto);
  }
  
  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateAboutUsDto: UpdateAboutUsDto,
  ) {
    return await this.aboutUsService.updateAll(
      contentGroupId,
      updateAboutUsDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
