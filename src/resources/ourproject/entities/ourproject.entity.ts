import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type OurprojectDocument = HydratedDocument<Ourproject>;
@Schema()
export class Ourproject {
  @ApiProperty({
    title: 'Title OurProject',
    example: 'Our Project',
  })
  @Prop({ required: false })
  titleOurProject: string;

  @ApiProperty({
    description: 'A brief description of the our project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: false })
  description: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Types.ObjectId;

  @Prop({ required: true, enum: ELanguage, default: ELanguage.UKRAINIAN })
  language: ELanguage;
}
export const OurprojectSchema = SchemaFactory.createForClass(Ourproject);
