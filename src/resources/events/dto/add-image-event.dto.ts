import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Image } from 'src/resources/image/entities/image.entity';

export class AddImageEventDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    description: 'This is data of event',
    example: '10 September 2024 10:44',
  })
  dataEvent: string;

  @ApiProperty({
    description: 'This is adress of Event',
    example: 'Kyev, Khreschatik 10',
  })
  adressEvent: string;

  @ApiProperty({
    title: 'Title Event',
    example: 'New event',
  })
  titleEvent: string;

  @ApiProperty({
    description: 'A brief description of the event',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description: string;
}
