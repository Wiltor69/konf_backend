import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Language } from 'src/resources/util/enum';

export class CreateContactDto {
  @ApiProperty({
    description: 'This is the location of the company',
    example: 'Business center',
    required: true,
  })
  titleCont: string;

  @ApiProperty({
    description: 'This is the adress',
    example: 'City, Street, housenumber, office.',
    required: true,
  })
  adressCont: string;

  @ApiProperty({
    description: 'This is the telephone number',
    example: '+1 555 444 33 21',
    required: true,
  })
  phoneCont: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsEnum(Language)
  language?: Language;

  // @ApiProperty({
  //   description: 'This is the location of the company',
  //   example: 'Business center',
  //   required: true,
  // })
  // titleContEN: string;

  // @ApiProperty({
  //   description: 'This is the adress',
  //   example: 'City, Street, housenumber, office.',
  //   required: true,
  // })
  // adressContEN: string;

  // @ApiProperty({
  //   description: 'This is the telephone number',
  //   example: '+1 555 444 33 21',
  //   required: true,
  // })
  // phoneContEN: string;
}
