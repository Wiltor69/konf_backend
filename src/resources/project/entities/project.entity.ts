import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type ProjectDocument = HydratedDocument<Project>;
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Project {
  @ApiProperty({
    title: 'Title Project',
    example: 'Project',
  })
  @Prop({ required: true })
  titleProject: string;

  @ApiProperty({
    description: 'A brief description of the bold project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  // Подзаголовок
  subTitle: string;

  @ApiProperty({
    description: 'A brief description of the project',
  })
  @Prop({ required: true })
  description: string[];

  @ApiProperty({
    description: 'A brief description of the project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: false })
  // Примечание
  noteProject: string;

  @ApiProperty({
    description: 'A brief description of the when',
    example: 'Data',
  })
  @Prop({ required: false })
  descriptionWhen: string;

  @ApiProperty({
    description: 'A brief description of the where',
    example: 'Place',
  })
  @Prop({ required: false })
  descriptionWhere: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Types.ObjectId;

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
export const ProjectSchema = SchemaFactory.createForClass(Project);
