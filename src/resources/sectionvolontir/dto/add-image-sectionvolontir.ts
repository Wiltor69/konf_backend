import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Image } from 'src/resources/image/entities/image.entity';
import { ELanguage } from 'src/resources/util/enum';
export class AddImageSectionvolontirDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    title: 'Title Section of volontir',
    example: 'Section',
  })
  title: string;

  @ApiProperty({
    description: 'This information about volontirs',
  })
  description: string[];

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
