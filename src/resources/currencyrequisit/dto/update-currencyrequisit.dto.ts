import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCurrencyrequisitDto } from './create-currencyrequisit.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateCurrencyrequisitDto extends PartialType(
  CreateCurrencyrequisitDto,
) {
  @ApiProperty({
    description: 'This is the name organization',

    required: true,
  })
  nameOrganization: string;

  @ApiProperty({
    description: 'This is the IBAN code',

    required: true,
  })
  codeIBAN: string;

  @ApiProperty({
    description: 'This is the Bank',

    required: true,
  })
  bankName: string;

  @ApiProperty({
    description: 'This is the Bank SWIFT Code',

    required: true,
  })
  bankSWIFTCode: string;

  @ApiProperty({
    description: 'This is the Company address',

    required: true,
  })
  companyAddress: string;

  @ApiProperty({
    description: 'This is the Account in the correspondent bank',

    required: true,
  })
  acountCorrespondentBank: string;

  @ApiProperty({
    description: 'This is the SWIFT Code of the correspondent bank',

    required: true,
  })
  codeSWIFTCorrespondentBank: string;

  @ApiProperty({
    description: 'This is the Correspondent bank',

    required: true,
  })
  correspondentBank: string;

  @ApiProperty({
    description: 'This is the Purpose of payment',

    required: true,
  })
  payment: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;

  @ApiPropertyOptional({
    description: 'contentGroupId',
    default: null,
  })
  contentGroupId: string;
}
