import { ApiProperty } from '@nestjs/swagger';

export class CreateMainDto {
  @ApiProperty({
    title: 'Title Main',
    example: 'Main',
  })
  titleMainUA: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionUA: string;

  @ApiProperty({
    title: 'Title Main',
    example: 'Main',
  })
  titleMainEN: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionEN: string;
}
