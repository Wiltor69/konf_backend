import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import { Language } from 'src/resources/util/enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiProperty({
    description: 'This is the location of the company',
    example: 'Business center',
    required: false,
  })
  titleCont: string;

  @ApiProperty({
    description: 'This is the adress',
    example: 'City, Street, housenumber, office.',
    required: false,
  })
  adressCont: string;

  @ApiProperty({
    description: 'This is the telephone number',
    example: '+1 555 444 33 21',
    required: false,
  })
  phoneCont: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'UA',
    required: true,
  })
  @IsOptional()
  @IsEnum(Language)
  language?: Language;
}
