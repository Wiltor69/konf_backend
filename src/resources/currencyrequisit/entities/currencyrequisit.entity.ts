import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { ELanguage } from 'src/resources/util/enum';

export type CurrencyrequisitDocument = HydratedDocument<Currencyrequisit>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Currencyrequisit {
  @ApiProperty({
    description: 'This is the name organization',
  })
  @Prop({ required: true })
  nameOrganization: string;

  @ApiProperty({
    description: 'This is the IBAN code',
  })
  @Prop({ required: true })
  codeIBAN: string;

  @ApiProperty({
    description: 'This is the Bank',
  })
  @Prop({ required: true })
  bankName: string;

  @ApiProperty({
    description: 'This is the Bank SWIFT Code',
  })
  @Prop({ required: true })
  bankSWIFTCode: string;

  @ApiProperty({
    description: 'This is the Company address',
  })
  @Prop({ required: true })
  companyAddress: string;

  @ApiProperty({
    description: 'This is the Account in the correspondent bank',
  })
  @Prop({ required: true })
  acountCorrespondentBank: string;

  @ApiProperty({
    description: 'This is the SWIFT Code of the correspondent bank',
  })
  @Prop({ required: true })
  codeSWIFTCorrespondentBank: string;

  @ApiProperty({
    description: 'This is the Correspondent bank',
  })
  @Prop({ required: true })
  correspondentBank: string;

  @ApiProperty({
    description: 'This is the Purpose of payment',
  })
  @Prop({ required: true })
  payment: string;

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

export const CurrencyrequisitSchema =
  SchemaFactory.createForClass(Currencyrequisit);
