import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true })
  titleCont: string;

  @Prop({ required: true })
  adressCont: string;

  @Prop({ required: true })
  phoneCont: string;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);
