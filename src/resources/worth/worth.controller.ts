import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorthService } from './worth.service';
import { CreateWorthDto } from './dto/create-worth.dto';
import { UpdateWorthDto } from './dto/update-worth.dto';

@Controller('worth')
export class WorthController {
  constructor(private readonly worthService: WorthService) {}

  @Post()
  create(@Body() createWorthDto: CreateWorthDto) {
    return this.worthService.create(createWorthDto);
  }

  @Get()
  findAll() {
    return this.worthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorthDto: UpdateWorthDto) {
    return this.worthService.update(+id, updateWorthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worthService.remove(+id);
  }
}
