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
import { CurrencyrequisitService } from './currencyrequisit.service';
import { CreateCurrencyrequisitDto } from './dto/create-currencyrequisit.dto';
import { UpdateCurrencyrequisitDto } from './dto/update-currencyrequisit.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ELanguage } from '../util/enum';

@ApiTags('currencyrequisit')
@Controller('currencyrequisit')
export class CurrencyrequisitController {
  constructor(
    private readonly currencyrequisitService: CurrencyrequisitService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCurrencyRequisitDto: CreateCurrencyrequisitDto) {
    if (
      createCurrencyRequisitDto.contentGroupId &&
      !Types.ObjectId.isValid(createCurrencyRequisitDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.currencyrequisitService.create(createCurrencyRequisitDto);
  }

  // @Get()
  // findAll() {
  //   return this.currencyrequisitService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyrequisitService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.currencyrequisitService.findByLanguage(language);
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
    return this.currencyrequisitService.findOneByLanguageAndContentGroupId(
      objectId,
      lang,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyRequisitDto: UpdateCurrencyrequisitDto,
  ) {
    return this.currencyrequisitService.update(id, updateCurrencyRequisitDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateCurrencyRequisitDto: UpdateCurrencyrequisitDto,
  ) {
    return await this.currencyrequisitService.updateAll(
      contentGroupId,
      updateCurrencyRequisitDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyrequisitService.remove(id);
  }
}
