import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { SectionaboutService } from './sectionabout.service';
import { CreateSectionaboutDto } from './dto/create-sectionabout.dto';
import { UpdateSectionaboutDto } from './dto/update-sectionabout.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('sectionabout')
@Controller('sectionabout')
export class SectionaboutController {
  constructor(private readonly sectionaboutService: SectionaboutService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createSectionaboutDto: CreateSectionaboutDto) {
    if (
      createSectionaboutDto.contentGroupId &&
      !Types.ObjectId.isValid(createSectionaboutDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.sectionaboutService.create(createSectionaboutDto);
  }

  // @Get()
  // findAll() {
  //   return this.sectionaboutService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionaboutService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.sectionaboutService.findByLanguage(language);
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
    return this.sectionaboutService.findOneByLanguageAndContentGroupId(
      objectId,
      lang,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionaboutDto: UpdateSectionaboutDto,
  ) {
    return this.sectionaboutService.update(id, updateSectionaboutDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateSectionaboutDto: UpdateSectionaboutDto,
  ) {
    return await this.sectionaboutService.updateAll(
      contentGroupId,
      updateSectionaboutDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionaboutService.remove(id);
  }
}
