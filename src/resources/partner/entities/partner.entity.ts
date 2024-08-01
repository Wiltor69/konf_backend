import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Image } from 'src/resources/image/entities/image.entity';

export type PartnerDocument = HydratedDocument<Partner>;
@Schema()
export class Partner {
  @ApiProperty({
    description: 'Web company',
    example: 'http://google.com',
  })
  @Prop({ required: true })
  webPatner: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  imagePartner: Image;
}
export const PartnerSchema = SchemaFactory.createForClass(Partner);
