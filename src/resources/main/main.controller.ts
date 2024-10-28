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
import { MainService } from './main.service';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';
@ApiTags('main')
@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createMainDto: CreateMainDto) {
    if (
      createMainDto.contentGroupId &&
      !Types.ObjectId.isValid(createMainDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.mainService.create(createMainDto);
  }

  // @Get()
  // findAll() {
  //   return this.mainService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainService.findOne(id);
  }
  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.mainService.findByLanguage(language);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainDto: UpdateMainDto) {
    return this.mainService.update(id, updateMainDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateMainDto: UpdateMainDto,
  ) {
    return await this.mainService.updateAll(contentGroupId, updateMainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainService.remove(id);
  }
}
