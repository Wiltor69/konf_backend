import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Query,
  Delete,
  NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Partner, PartnerDocument } from './entities/partner.entity';
import { Model, Types } from 'mongoose';
// import { ELanguage } from '../util/enum';
@ApiTags('partner')
@Controller('partner')
export class PartnerController {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
    private readonly partnerService: PartnerService,
  ) {}

  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnerService.create(createPartnerDto);
  }

  @Get()
  findAll() {
    return this.partnerService.findAll();
  }

  // @Get()
  // async findAllLanguge(@Query('language') language: ELanguage) {
  //   return this.partnerService.findByLanguage(language);
  // }

  // @Get(':lang/:contentGroupId')
  // async findOneByLanguageAndContentGroupId(
  //   @Param('contentGroupId') contentGroupId: string,
  //   @Param('lang') lang: ELanguage,
  // ) {
  //   if (!Types.ObjectId.isValid(contentGroupId)) {
  //     throw new BadRequestException('Invalid contentGroupId');
  //   }
  //   const objectId = new Types.ObjectId(contentGroupId);
  //   return this.partnerService.findOneByLanguageAndContentGroupId(
  //     objectId,
  //     lang,
  //   );
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnerService.update(id, updatePartnerDto);
  }

  async updateAll(
    contentGroupId: string,
    updatePartnerDto: UpdatePartnerDto,
  ): Promise<Partner[]> {
    const update = { $set: updatePartnerDto };
    const result = await this.partnerModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Partner entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.partnerModel.find({ contentGroupId }).exec();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const partner = await this.partnerModel.findByIdAndDelete(id);
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }
}
