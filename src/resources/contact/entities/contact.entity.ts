import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true })
  titleCont: string;

  @Prop({ required: true })
  adressCont: string;

  @Prop({ required: true })
  phoneCont: string;

  @Prop({ required: true, enum: ELanguage })
  language: ELanguage;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
