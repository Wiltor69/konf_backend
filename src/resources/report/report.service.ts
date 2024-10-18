import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ContentGroupService } from '../content-group/content-group.service';
import { ReportDocument, Report } from './entities/report.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ELanguage } from '../util/enum';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    private readonly contentGroupService: ContentGroupService,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const contentGroupId = await this.contentGroupService.ensureContentGroup(
      createReportDto.contentGroupId,
      createReportDto.language,
    );
    const newReport = new this.reportModel({
      ...createReportDto,
      contentGroupId,
    });
    await newReport.save();
    return newReport;
  }

  findAll(): Promise<Report[]> {
    return this.reportModel.find().exec();
  }

  findOne(id: string): Promise<Report> {
    return this.reportModel.findById(id);
  }

  async findByLanguage(language: ELanguage): Promise<Report[]> {
    return this.reportModel.find({ language }).exec();
  }

  update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    return this.reportModel.findByIdAndUpdate(id, updateReportDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    const deleteReport = await this.reportModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!deleteReport) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    try {
      if (deleteReport.contentGroupId) {
        await this.reportModel
          .deleteMany({ contentGroupId: deleteReport.contentGroupId })
          .exec();
        await this.contentGroupService.deleteById(deleteReport.contentGroupId);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
