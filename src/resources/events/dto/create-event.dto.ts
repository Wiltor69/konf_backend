import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'This is data of event',
    example: '10 September 2024 10:44',
  })
  dataEventUA: string;

  @ApiProperty({
    description: 'This is adress of Event',
    example: 'Kyev, Khreschatik 10',
  })
  adressEventUA: string;

  @ApiProperty({
    title: 'Title Event',
    example: 'New event',
  })
  titleEventUA: string;

  @ApiProperty({
    description: 'A brief description of the event',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionUA: string;

  @ApiProperty({
    description: 'This is data of event',
    example: '10 September 2024 10:44',
  })
  dataEventEN: string;

  @ApiProperty({
    description: 'This is adress of Event',
    example: 'Kyev, Khreschatik 10',
  })
  adressEventEN: string;

  @ApiProperty({
    title: 'Title Event',
    example: 'New event',
  })
  titleEventEN: string;

  @ApiProperty({
    description: 'A brief description of the event',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionEN: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageEventId: string;
}
