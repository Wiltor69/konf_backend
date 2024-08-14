import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionaboutService } from './sectionabout.service';
import { CreateSectionaboutDto } from './dto/create-sectionabout.dto';
import { UpdateSectionaboutDto } from './dto/update-sectionabout.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sectionabout')
@Controller('sectionabout')
export class SectionaboutController {
  constructor(private readonly sectionaboutService: SectionaboutService) {}

  @Post()
  create(@Body() createSectionaboutDto: CreateSectionaboutDto) {
    return this.sectionaboutService.create(createSectionaboutDto);
  }

  @Get()
  findAll() {
    return this.sectionaboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionaboutService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionaboutDto: UpdateSectionaboutDto,
  ) {
    return this.sectionaboutService.update(id, updateSectionaboutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionaboutService.remove(id);
  }
}
