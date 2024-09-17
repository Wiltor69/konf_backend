import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type SectionvolontirDocument = HydratedDocument<Sectionvolontir>;

@Schema()
export class Sectionvolontir {
  @ApiProperty({
    title: 'Title Section of volontir',
    example: 'Section',
  })
  @Prop({ required: true })
  title: string;
  @ApiProperty({
    description: 'This information about volontirs',
  })
  @Prop({ required: true })
  description: string[];

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Types.ObjectId;

  @Prop({ required: true, enum: ELanguage, default: ELanguage.UKRAINIAN })
  language: ELanguage;

  @ApiProperty({
    description: 'Base entity ID',
    example: '60d0fe4f5311236168a109ca',
    required: false,
  })
  @Prop({ required: false, default: null })
  baseEntityId: string;
}

export const SectionvolontirSchema =
  SchemaFactory.createForClass(Sectionvolontir);
