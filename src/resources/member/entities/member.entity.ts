import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  @Prop({ required: true })
  nameUA: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  @Prop({ required: true })
  roleUA: string;

  @ApiProperty({
    description: 'A brief description of the member',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  descriptionUA: string;

  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  @Prop({ required: true })
  nameEN: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  @Prop({ required: true })
  roleEN: string;

  @ApiProperty({
    description: 'A brief description of the member',
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
export const MemberSchema = SchemaFactory.createForClass(Member);
