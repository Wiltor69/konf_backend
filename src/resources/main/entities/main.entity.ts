import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Contact } from 'src/resources/contact/entities/contact.entity';
import { Event } from 'src/resources/events/entities/event.entity';
import { Help } from 'src/resources/help/entities/help.entity';
import { Partner } from 'src/resources/partner/entities/partner.entity';
import { Worth } from 'src/resources/worth/entities/worth.entity';

export type MainDocument = HydratedDocument<Main>;
@Schema()
export class Main {
  @ApiProperty({
    title: 'Title Main',
    example: 'Main',
  })
  @Prop({ required: true })
  titleMain: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worth' }] })
  worth: Worth[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] })
  event: Event[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Help' }] })
  help: Help[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }] })
  partner: Partner[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }] })
  contact: Contact[];
}
export const MainSchema = SchemaFactory.createForClass(Main);
