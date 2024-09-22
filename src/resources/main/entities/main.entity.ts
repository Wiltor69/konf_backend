import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Contact } from 'src/resources/contact/entities/contact.entity';
import { Event } from 'src/resources/events/entities/event.entity';
import { Help } from 'src/resources/help/entities/help.entity';
import { Partner } from 'src/resources/partner/entities/partner.entity';
import { ELanguage } from 'src/resources/util/enum';
import { Worth } from 'src/resources/worth/entities/worth.entity';

export type MainDocument = HydratedDocument<Main>;
@Schema({
  timestamps: true,
  versionKey: false,
})
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
export const MainSchema = SchemaFactory.createForClass(Main);
