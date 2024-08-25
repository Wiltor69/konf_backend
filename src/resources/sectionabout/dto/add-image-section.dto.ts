import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { Image } from 'src/resources/image/entities/image.entity';
import { ELanguage } from 'src/resources/util/enum';

export class AddImageSectionDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    title: 'Title Section element',
    example: 'New element',
  })
  titleElement: string;

  @ApiProperty({
    description: 'A brief description of the element',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;
}
