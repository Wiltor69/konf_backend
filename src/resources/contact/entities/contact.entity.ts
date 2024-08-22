import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Language } from 'src/resources/util/enum';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true })
  titleCont: string;

  @Prop({ required: true })
  adressCont: string;

  @Prop({ required: true })
  phoneCont: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    ref: 'Language',
    default: Language.UA,
  })
  language: Language;

  // @Prop({ required: true })
  // titleContEN: string;

  // @Prop({ required: true })
  // adressContEN: string;

  // @Prop({ required: true })
  // phoneContEN: string;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);
