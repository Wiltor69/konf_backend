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
import { SectionvolontirService } from './sectionvolontir.service';
import { CreateSectionvolontirDto } from './dto/create-sectionvolontir.dto';
import { UpdateSectionvolontirDto } from './dto/update-sectionvolontir.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('sectionvolontir')
@Controller('sectionvolontir')
export class SectionvolontirController {
  constructor(
    private readonly sectionvolontirService: SectionvolontirService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createSectionvolontirDto: CreateSectionvolontirDto) {
    if (
      createSectionvolontirDto.contentGroupId &&
      !Types.ObjectId.isValid(createSectionvolontirDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }

    return this.sectionvolontirService.create(createSectionvolontirDto);
  }

  // @Get()
  // findAll() {
  //   return this.sectionvolontirService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionvolontirService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.sectionvolontirService.findByLanguage(language);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionvolontirDto: UpdateSectionvolontirDto,
  ) {
    return this.sectionvolontirService.update(id, updateSectionvolontirDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateSectionvolontirDto: UpdateSectionvolontirDto,
  ) {
    return await this.sectionvolontirService.updateAll(
      contentGroupId,
      updateSectionvolontirDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionvolontirService.remove(id);
  }
}
