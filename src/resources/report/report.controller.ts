import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags } from '@nestjs/swagger';

import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createReportDto: CreateReportDto) {
    if (
      createReportDto.contentGroupId &&
      !Types.ObjectId.isValid(createReportDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.reportService.create(createReportDto);
  }

  // @Get()
  // findAll() {
  //   return this.reportService.findAll();
  // }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.reportService.findByLanguage(language);
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
    return this.reportService.findOneByLanguageAndContentGroupId(
      objectId,
      lang,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(id, updateReportDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return await this.reportService.updateAll(contentGroupId, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }
}
