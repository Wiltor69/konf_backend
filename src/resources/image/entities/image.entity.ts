import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @ApiProperty({
    description: 'The URL of the image',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @Prop({ required: true })
  url: string;

  @ApiProperty({
    description: 'A brief description of the image',
    example: 'A beautiful landscape',
    required: false,
  })
  @Prop()
  description: string;
}
export const ImageSchema = SchemaFactory.createForClass(Image);
