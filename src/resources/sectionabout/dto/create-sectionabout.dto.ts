import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionaboutDto {
  @ApiProperty({
    title: 'Title Section element',
    example: 'New element',
  })
  titleElementUA: string;

  @ApiProperty({
    description: 'A brief description of the element',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionUA: string;

  @ApiProperty({
    title: 'Title Section element',
    example: 'New element',
  })
  titleElementEN: string;

  @ApiProperty({
    description: 'A brief description of the element',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionEN: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageId: string;
}
