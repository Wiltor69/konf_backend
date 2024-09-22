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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorthDto: UpdateWorthDto) {
    return this.worthService.update(id, updateWorthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worthService.remove(id);
  }
}
