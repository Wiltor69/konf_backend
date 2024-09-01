import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

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
    description: 'A brief description of the help',
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
export const HelpSchema = SchemaFactory.createForClass(Help);
