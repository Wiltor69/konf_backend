import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorthDocument = HydratedDocument<Worth>;

@Schema()
export class Worth {
  @Prop({ required: true })
  textWorthUA: string;
  @Prop({ required: true })
  textWorthEN: string;
}
export const WorthSchema = SchemaFactory.createForClass(Worth);
