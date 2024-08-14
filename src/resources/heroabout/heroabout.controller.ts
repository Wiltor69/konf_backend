import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HeroaboutService } from './heroabout.service';
import { CreateHeroaboutDto } from './dto/create-heroabout.dto';
import { UpdateHeroaboutDto } from './dto/update-heroabout.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('heroabout')
@Controller('heroabout')
export class HeroaboutController {
  constructor(private readonly heroaboutService: HeroaboutService) {}

  @Post()
  create(@Body() createHeroaboutDto: CreateHeroaboutDto) {
    return this.heroaboutService.create(createHeroaboutDto);
  }

  @Get()
  findAll() {
    return this.heroaboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroaboutService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHeroaboutDto: UpdateHeroaboutDto,
  ) {
    return this.heroaboutService.update(id, updateHeroaboutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroaboutService.remove(id);
  }
}
