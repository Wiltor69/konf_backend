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
import { WorthService } from './worth.service';
import { CreateWorthDto } from './dto/create-worth.dto';
import { UpdateWorthDto } from './dto/update-worth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';
@ApiTags('worth')
@Controller('worth')
export class WorthController {
  constructor(private readonly worthService: WorthService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createWorthDto: CreateWorthDto) {
    if (
      createWorthDto.contentGroupId &&
      !Types.ObjectId.isValid(createWorthDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.worthService.create(createWorthDto);
  }

  // @Get()
  // findAll() {
  //   return this.worthService.findAll();
  // }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.worthService.findByLanguage(language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worthService.findOne(id);
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
    return this.worthService.findOneByLanguageAndContentGroupId(objectId, lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorthDto: UpdateWorthDto) {
    return this.worthService.update(id, updateWorthDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateWorthDto: UpdateWorthDto,
  ) {
    return await this.worthService.updateAll(contentGroupId, updateWorthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worthService.remove(id);
  }
}
