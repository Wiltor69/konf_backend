import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type WorthDocument = HydratedDocument<Worth>;

@Schema()
export class Worth {
  @Prop({ required: true })
  textWorth: string;

  @Prop({ required: true, enum: ELanguage, default: ELanguage.UKRAINIAN })
  language: ELanguage;
}
export const WorthSchema = SchemaFactory.createForClass(Worth);
