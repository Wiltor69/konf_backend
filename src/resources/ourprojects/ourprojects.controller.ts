import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OurprojectsService } from './ourprojects.service';
import { CreateOurprojectDto } from './dto/create-ourproject.dto';
import { UpdateOurprojectDto } from './dto/update-ourproject.dto';
import { ELanguage } from '../util/enum';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('ourprojects')
@Controller('ourprojects')
export class OurprojectsController {
  constructor(private readonly ourprojectsService: OurprojectsService) {}

  @Post()
  create(@Body() createOurprojectDto: CreateOurprojectDto) {
    return this.ourprojectsService.create(createOurprojectDto);
  }

  // @Get()
  // findAll() {
  //   return this.ourprojectsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ourprojectsService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.ourprojectsService.findByLanguage(language);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOurprojectDto: UpdateOurprojectDto,
  ) {
    return this.ourprojectsService.update(id, updateOurprojectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ourprojectsService.remove(id);
  }
}
