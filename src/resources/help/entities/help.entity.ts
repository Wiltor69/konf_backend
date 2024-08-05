import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type HelpDocument = HydratedDocument<Help>;
@Schema()
export class Help {
  @ApiProperty({
    description: 'Title Help',
    example: 'Help all people',
  })
  @Prop({ required: true })
  titleHelp: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Types.ObjectId;
}
export const HelpSchema = SchemaFactory.createForClass(Help);
