import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type SectionaboutDocument = HydratedDocument<Sectionabout>;

@Schema()
export class Sectionabout {
  @ApiProperty({
    title: 'Title Section element',
    example: 'New element',
  })
  @Prop({ required: true })
  titleElementUA: string;

  @ApiProperty({
    description: 'A brief description of the element',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  descriptionUA: string;

  @ApiProperty({
    title: 'Title Section element',
    example: 'New element',
  })
  @Prop({ required: true })
  titleElementEN: string;

  @ApiProperty({
    description: 'A brief description of the element',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  descriptionEN: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Types.ObjectId;
}
export const SectionaboutSchema = SchemaFactory.createForClass(Sectionabout);
