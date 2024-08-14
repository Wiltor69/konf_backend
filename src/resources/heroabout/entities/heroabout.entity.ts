import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type HeroaboutDocument = HydratedDocument<Heroabout>;

@Schema()
export class Heroabout {
  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description1UA: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description1EN: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description2UA: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description2EN: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description3UA: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description3EN: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Types.ObjectId;
}
export const HeroaboutSchema = SchemaFactory.createForClass(Heroabout);
