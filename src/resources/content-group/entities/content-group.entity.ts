import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type ContentGroupDocument = HydratedDocument<ContentGroup>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class ContentGroup {
  @Prop({
    type: [String],
    enum: Object.values(ELanguage),
    required: true,
  })
  languages: ELanguage[];
}
export const ContentGroupSchema = SchemaFactory.createForClass(ContentGroup);
