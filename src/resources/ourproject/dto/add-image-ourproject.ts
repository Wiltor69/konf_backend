import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { Image } from 'src/resources/image/entities/image.entity';
import { ELanguage } from 'src/resources/util/enum';

export class AddImageOurProjectDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    title: 'Title OurProject',
    example: 'Our Project',
  })
  titleOurProject: string;

  @ApiProperty({
    description: 'A brief description of the our project',
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
