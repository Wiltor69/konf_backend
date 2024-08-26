import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateEventDto extends PartialType(CreateEventDto) {
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
    title: 'Link Event',
    example: 'http://localhost:3000/....',
    required: false,
  })
  linkEvent: string;

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

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageEventId: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;
}
