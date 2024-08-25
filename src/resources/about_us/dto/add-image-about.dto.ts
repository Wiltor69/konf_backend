import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { Image } from 'src/resources/image/entities/image.entity';
import { ELanguage } from 'src/resources/util/enum';

export class AddImageAboutDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

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
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;
}
