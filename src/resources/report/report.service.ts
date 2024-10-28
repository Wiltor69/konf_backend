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

  async findOne(id: string): Promise<Report> {
    const report = await this.reportModel.findById(id).exec();
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async findByLanguage(language: ELanguage): Promise<Report[]> {
    return this.reportModel.find({ language }).exec();
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const update = { $set: updateReportDto };
    const report = await this.reportModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async updateAll(
    contentGroupId: string,
    updateReportDto: UpdateReportDto,
  ): Promise<Report[]> {
    const update = { $set: updateReportDto };
    const result = await this.reportModel.updateMany(
      { contentGroupId },
      update,
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `No Report entities found with contentGroupId ${contentGroupId}`,
      );
    }
    return this.reportModel.find({ contentGroupId }).exec();
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
