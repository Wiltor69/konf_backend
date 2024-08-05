import { ApiProperty } from '@nestjs/swagger';

export class CreateMainDto {
  @ApiProperty({
    title: 'Title Main',
    example: 'Main',
  })
  titleMain: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description: string;
}
