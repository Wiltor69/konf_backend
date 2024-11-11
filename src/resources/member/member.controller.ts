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
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags } from '@nestjs/swagger';
import { ELanguage } from '../util/enum';
import { Types } from 'mongoose';

@ApiTags('member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createMemberDto: CreateMemberDto) {
    if (
      createMemberDto.contentGroupId &&
      !Types.ObjectId.isValid(createMemberDto.contentGroupId)
    ) {
      throw new BadRequestException('Invalid id');
    }
    return this.memberService.create(createMemberDto);
  }

  // @Get()
  // findAll() {
  //   return this.memberService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Get()
  async findAllLanguge(@Query('language') language: ELanguage) {
    return this.memberService.findByLanguage(language);
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
    return this.memberService.findOneByLanguageAndContentGroupId(
      objectId,
      lang,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Patch(':contentGroupId/bulk-update')
  async updateAll(
    @Param('contentGroupId') contentGroupId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return await this.memberService.updateAll(contentGroupId, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
