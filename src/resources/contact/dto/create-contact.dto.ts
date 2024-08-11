import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    description: 'This is the location of the company',
    example: 'Business center',
    required: true,
  })
  titleContUA: string;

  @ApiProperty({
    description: 'This is the adress',
    example: 'City, Street, housenumber, office.',
    required: true,
  })
  adressContUA: string;

  @ApiProperty({
    description: 'This is the telephone number',
    example: '+1 555 444 33 21',
    required: true,
  })
  phoneContUA: string;

  @ApiProperty({
    description: 'This is the location of the company',
    example: 'Business center',
    required: true,
  })
  titleContEN: string;

  @ApiProperty({
    description: 'This is the adress',
    example: 'City, Street, housenumber, office.',
    required: true,
  })
  adressContEN: string;

  @ApiProperty({
    description: 'This is the telephone number',
    example: '+1 555 444 33 21',
    required: true,
  })
  phoneContEN: string;
}
