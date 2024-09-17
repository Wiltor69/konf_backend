import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class CreateSectionvolontirDto {
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
    description: 'Base entity ID',
    default: null,
  })
  @IsOptional()
  @IsString()
  baseEntityId?: string;
}
