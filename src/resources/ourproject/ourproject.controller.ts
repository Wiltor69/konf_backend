import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OurprojectService } from './ourproject.service';
import { CreateOurprojectDto } from './dto/create-ourproject.dto';
import { UpdateOurprojectDto } from './dto/update-ourproject.dto';

@Controller('ourproject')
export class OurprojectController {
  constructor(private readonly ourprojectService: OurprojectService) {}

  @Post()
  create(@Body() createOurprojectDto: CreateOurprojectDto) {
    return this.ourprojectService.create(createOurprojectDto);
  }

  @Get()
  findAll() {
    return this.ourprojectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ourprojectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOurprojectDto: UpdateOurprojectDto) {
    return this.ourprojectService.update(+id, updateOurprojectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ourprojectService.remove(+id);
  }
}
