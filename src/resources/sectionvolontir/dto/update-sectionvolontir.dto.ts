import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSectionvolontirDto } from './create-sectionvolontir.dto';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateSectionvolontirDto extends PartialType(
  CreateSectionvolontirDto,
) {
  @ApiProperty({
    title: 'Title Section of volontir',
    example: 'Section',
  })
  title: string;
  @ApiProperty({
    description: 'This information about volontirs',
  })
  @IsArray()
  description: string[];

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageId: string;

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
