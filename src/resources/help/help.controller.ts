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
import { HelpService } from './help.service';
import { CreateHelpDto } from './dto/create-help.dto';
import { UpdateHelpDto } from './dto/update-help.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';
@ApiTags('help')
@Controller('help')
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createHelpDto: CreateHelpDto) {
    if (
      createHelpDto.contentGroupId &&
      !Types.ObjectId.isValid(createHelpDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.helpService.create(createHelpDto);
  }

  // @Get()
  // findAll() {
  //   return this.helpService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.helpService.findByLanguage(language);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelpDto: UpdateHelpDto) {
    return this.helpService.update(id, updateHelpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpService.remove(id);
  }
}
