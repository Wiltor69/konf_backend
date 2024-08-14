import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { Image } from 'src/resources/image/entities/image.entity';

export class AddImageHeroDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description1UA: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description1EN: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description2UA: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description2EN: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description3UA: string;

  @ApiProperty({
    description: 'A brief description of the hero section',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description3EN: string;
}
