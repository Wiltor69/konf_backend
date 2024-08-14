import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Image } from 'src/resources/image/entities/image.entity';

export class AddImageMemberDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  nameUA: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  roleUA: string;

  @ApiProperty({
    description: 'A brief description of the member',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionUA: string;

  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  nameEN: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  roleEN: string;

  @ApiProperty({
    description: 'A brief description of the member',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionEN: string;
}
