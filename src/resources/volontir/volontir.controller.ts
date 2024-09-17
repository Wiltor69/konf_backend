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
import { VolontirService } from './volontir.service';
import { CreateVolontirDto } from './dto/create-volontir.dto';
import { UpdateVolontirDto } from './dto/update-volontir.dto';
import { ELanguage } from '../util/enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('volontir')
@Controller('volontir')
export class VolontirController {
  constructor(private readonly volontirService: VolontirService) {}

  @Post()
  create(@Body() createVolontirDto: CreateVolontirDto) {
    return this.volontirService.create(createVolontirDto);
  }

  // @Get()
  // findAll() {
  //   return this.volontirService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volontirService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.volontirService.findByLanguage(language);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVolontirDto: UpdateVolontirDto,
  ) {
    return this.volontirService.update(id, updateVolontirDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volontirService.remove(id);
  }
}
