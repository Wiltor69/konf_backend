import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutUsDto {
  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  titleAboutUA: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionUA: string;

  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  titleAboutEN: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionEN: string;
}
