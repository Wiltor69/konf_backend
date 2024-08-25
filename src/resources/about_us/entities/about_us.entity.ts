import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';

import { ELanguage } from 'src/resources/util/enum';

export type AboutUsDocument = HydratedDocument<AboutUs>;
@Schema()
export class AboutUs {
  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  @Prop({ required: true })
  titleAbout: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description1: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description2: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description3: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Types.ObjectId;

  @Prop({ required: true, enum: ELanguage, default: ELanguage.UKRAINIAN })
  language: ELanguage;
}
export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);
