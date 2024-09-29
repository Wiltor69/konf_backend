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
import { RequisitService } from './requisit.service';
import { CreateRequisitDto } from './dto/create-requisit.dto';
import { UpdateRequisitDto } from './dto/update-requisit.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('requisit')
@Controller('requisit')
export class RequisitController {
  constructor(private readonly requisitService: RequisitService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createRequisitDto: CreateRequisitDto) {
    if (
      createRequisitDto.contentGroupId &&
      !Types.ObjectId.isValid(createRequisitDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.requisitService.create(createRequisitDto);
  }

  // @Get()
  // findAll() {
  //   return this.requisitService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requisitService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.requisitService.findByLanguage(language);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequisitDto: UpdateRequisitDto,
  ) {
    return this.requisitService.update(id, updateRequisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requisitService.remove(id);
  }
}
