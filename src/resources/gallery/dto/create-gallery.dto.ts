import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class CreateGalleryDto {
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
