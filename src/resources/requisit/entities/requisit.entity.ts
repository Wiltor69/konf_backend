import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type RequisitDocument = HydratedDocument<Requisit>;

@Schema()
export class Requisit {
  @ApiProperty({
    description: 'This is the name organization',
  })
  @Prop({ required: true })
  nameOrganization: string[];

  @ApiProperty({
    description: 'This is the code',
  })
  @Prop({ required: true })
  code: string[];

  @ApiProperty({
    description: 'This is the Bank',
  })
  @Prop({ required: true })
  bankName: string[];

  @ApiProperty({
    description: 'This is the Recipient account number',
  })
  @Prop({ required: true })
  accountNumber: string[];

  @ApiProperty({
    description: 'This is the Purpose of payment',
  })
  @Prop({ required: true })
  payment: string[];

  @Prop({ required: true, enum: ELanguage, default: ELanguage.UKRAINIAN })
  language: ELanguage;
}
export const RequisitSchema = SchemaFactory.createForClass(Requisit);
