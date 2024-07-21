import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorthDocument = HydratedDocument<Worth>;

@Schema()
export class Worth {
  @Prop({ required: true })
  textWorth: string;
}
export const WorthSchema = SchemaFactory.createForClass(Worth);
