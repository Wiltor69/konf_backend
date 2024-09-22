import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Contact {
  @Prop({ required: true })
  titleCont: string;

  @Prop({ required: true })
  adressCont: string;

  @Prop({ required: true })
  phoneCont: string;

  @Prop({ required: true, enum: ELanguage, default: ELanguage.UKRAINIAN })
  language: ELanguage;
  @ApiProperty({
    description: 'contentGroupId',
    example: '60d0fe4f5311236168a109ca',
    required: true,
  })
  @Prop({ required: true, default: null })
  contentGroupId: string;

  @ApiProperty({
    description: 'Creation date (automatically generated)',
    example: '2023-04-01T00:00:00.000Z',
    readOnly: true,
  })
  @Prop()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date (automatically generated)',
    example: '2023-04-01T00:00:00.000Z',
    readOnly: true,
  })
  @Prop()
  updatedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
