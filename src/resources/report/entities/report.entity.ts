import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type ReportDocument = HydratedDocument<Report>;
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Report {
  @ApiProperty({
    description: 'Title Report',
    example: 'Finance report',
  })
  @Prop({ required: true })
  titleReport: string;

  @ApiProperty({
    description: 'Link report',
    example: 'http://google.doc',
  })
  @Prop({ required: true })
  linkReport: string;

  @Prop({ required: true, enum: ELanguage, default: ELanguage.UKRAINIAN })
  language: ELanguage;

  @ApiProperty({
    description: 'contentGroupId',
    example: '60d0fe4f5311236168a109ca',
    required: true,
  })
  @Prop({ required: true, default: null })
  contentGroupId: string;

  @ApiProperty({
    description: 'Creation date (automatically generated)',
    example: '2023-04-01T00:00:00.000Z',
    readOnly: true,
  })
  @Prop()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date (automatically generated)',
    example: '2023-04-01T00:00:00.000Z',
    readOnly: true,
  })
  @Prop()
  updatedAt: Date;
}
export const ReportSchema = SchemaFactory.createForClass(Report);
