import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;
@Schema()
export class Event {
  @ApiProperty({
    description: 'This is data of event',
    example: '10 September 2024 10:44',
  })
  @Prop({ required: true })
  dataEventUA: string;

  @ApiProperty({
    description: 'This is adress of Event',
    example: 'Kyev, Khreschatik 10',
  })
  @Prop({ required: true })
  adressEventUA: string;

  @ApiProperty({
    title: 'Title Event',
    example: 'New event',
  })
  @Prop({ required: true })
  titleEventUA: string;

  @ApiProperty({
    description: 'A brief description of the event',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  descriptionUA: string;

  @ApiProperty({
    description: 'This is data of event',
    example: '10 September 2024 10:44',
  })
  @Prop({ required: true })
  dataEventEN: string;

  @ApiProperty({
    description: 'This is adress of Event',
    example: 'Kyev, Khreschatik 10',
  })
  @Prop({ required: true })
  adressEventEN: string;

  @ApiProperty({
    title: 'Title Event',
    example: 'New event',
  })
  @Prop({ required: true })
  titleEventEN: string;

  @ApiProperty({
    description: 'A brief description of the event',
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
export const EventSchema = SchemaFactory.createForClass(Event);
