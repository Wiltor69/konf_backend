import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true })
  titleContUA: string;

  @Prop({ required: true })
  adressContUA: string;

  @Prop({ required: true })
  phoneContUA: string;

  @Prop({ required: true })
  titleContEN: string;

  @Prop({ required: true })
  adressContEN: string;

  @Prop({ required: true })
  phoneContEN: string;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);
