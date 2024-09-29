import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class CreateOurprojectDto {
  @ApiProperty({
    title: 'Title OurProject',
    example: 'Our Project',
  })
  titleOurProject: string;

  @ApiProperty({
    description: 'A brief description of the our project',
  })
  description: string[];

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageOurProjectId: string;

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
