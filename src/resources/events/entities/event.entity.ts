import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type EventDocument = HydratedDocument<Event>;
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Event {
  @ApiProperty({
    description: 'This is data of event',
    example: '10 September 2024 10:44',
  })
  @Prop({ required: true })
  dataEvent: string;

  @ApiProperty({
    description: 'This is adress of Event',
    example: 'Kyev, Khreschatik 10',
  })
  @Prop({ required: true })
  adressEvent: string;

  @ApiProperty({
    title: 'Link Event',
    example: 'http://localhost:3000/....',
  })
  @Prop({ required: false })
  linkEvent: string;

  @ApiProperty({
    title: 'Title Event',
    example: 'New event',
  })
  @Prop({ required: true })
  titleEvent: string;

  @ApiProperty({
    description: 'A brief description of the event',
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

  @ApiProperty({
    description: 'contentGroupId',
    example: '60d0fe4f5311236168a109ca',
    required: true,
  })
  @Prop({ required: true, default: null })
  contentGroupId: string;

  @ApiProperty({
    description: 'Creation date (automatically generated)',
    example: '2023-04-01T00:00:00.000Z',
    readOnly: true,
  })
  @Prop()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date (automatically generated)',
    example: '2023-04-01T00:00:00.000Z',
    readOnly: true,
  })
  @Prop()
  updatedAt: Date;
}
export const EventSchema = SchemaFactory.createForClass(Event);
