import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAboutUsDto } from './create-about_us.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateAboutUsDto extends PartialType(CreateAboutUsDto) {
  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  titleAbout: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description1: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description2: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description3: string;

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
}
