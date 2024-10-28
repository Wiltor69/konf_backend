import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createContactDto: CreateContactDto) {
    if (
      createContactDto.contentGroupId &&
      !Types.ObjectId.isValid(createContactDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.contactService.create(createContactDto);
  }

  // @Get()
  // findAll() {
  //   return this.contactService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }
  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.contactService.findByLanguage(language);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactService.updateAll(
      contentGroupId,
      updateContactDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
