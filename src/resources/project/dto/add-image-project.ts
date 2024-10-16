import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';
import { Image } from 'src/resources/image/entities/image.entity';

export class AddImageProjectDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    title: 'Title Project',
    example: 'Project',
  })
  titleProject: string;

  @ApiProperty({
    description: 'A brief description of the bold project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  // Подзаголовок
  subTitle: string;

  @ApiProperty({
    description: 'A brief description of the project',
  })
  description: string[];

  @ApiProperty({
    description: 'A brief description of the project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
    required: false,
  })
  // Примечание
  noteProject: string;

  @ApiProperty({
    description: 'A brief description of the when',
    example: 'Data',
    required: false,
  })
  descriptionWhen: string;

  @ApiProperty({
    description: 'A brief description of the where',
    example: 'Plase',
    required: false,
  })
  descriptionWhere: string;

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
