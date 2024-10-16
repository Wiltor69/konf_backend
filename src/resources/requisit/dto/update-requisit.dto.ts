import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRequisitDto } from './create-requisit.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateRequisitDto extends PartialType(CreateRequisitDto) {
  @ApiProperty({
    description: 'This is the name organization',

    required: true,
  })
  nameOrganization: string;

  @ApiProperty({
    description: 'This is the code',

    required: true,
  })
  code: string;

  @ApiProperty({
    description: 'This is the Bank',

    required: true,
  })
  bankName: string;

  @ApiProperty({
    description: 'This is the Recipient account number',

    required: true,
  })
  accountNumber: string;

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
