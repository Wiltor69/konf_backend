import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  @Prop({ required: true })
  role: string;

  @ApiProperty({
    description: 'A brief description of the member',
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
export const MemberSchema = SchemaFactory.createForClass(Member);
