import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class CreateReportDto {
  @ApiProperty({
    description: 'Title Report',
    example: 'Finance report',
  })
  
  titleReport: string;

  @ApiProperty({
    description: 'Link report',
    example: 'http://google.doc',
  })
  linkReport: string;

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
