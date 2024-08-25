import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type SectionaboutDocument = HydratedDocument<Sectionabout>;

@Schema()
export class Sectionabout {
  @ApiProperty({
    title: 'Title Section element',
    example: 'New element',
  })
  @Prop({ required: true })
  titleElement: string;

  @ApiProperty({
    description: 'A brief description of the element',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
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
export const SectionaboutSchema = SchemaFactory.createForClass(Sectionabout);
