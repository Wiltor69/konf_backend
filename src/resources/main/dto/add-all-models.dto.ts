import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { IsArray } from 'class-validator';
import { Contact } from 'src/resources/contact/entities/contact.entity';
import { Event } from 'src/resources/events/entities/event.entity';
import { Help } from 'src/resources/help/entities/help.entity';
import { Partner } from 'src/resources/partner/entities/partner.entity';
import { Worth } from 'src/resources/worth/entities/worth.entity';

export class AddAllModelsDto {
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

  @ApiProperty({
    description: 'This is Worth',
    example: '{}',
    required: false,
  })
  //   @IsArray()
  @Type(() => Worth)
  worth?: Worth[];

  @ApiProperty({
    description: 'This is Event',
    example: '{}',
    required: false,
  })
  //   @IsArray()
  @Type(() => Event)
  event?: Event[];

  @ApiProperty({
    description: 'This is Help',
    example: '{}',
    required: false,
  })
  //   @IsArray()
  @Type(() => Help)
  help?: Help[];

  @ApiProperty({
    description: 'This is Partner',
    example: '{}',
    required: false,
  })
  //   @IsArray()
  @Type(() => Partner)
  partner?: Partner[];

  @ApiProperty({
    description: 'This is Contact',
    example: '{}',
    required: false,
  })
  //   @IsArray()
  @Type(() => Contact)
  contact?: Contact[];
}
