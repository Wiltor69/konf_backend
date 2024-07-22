import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';

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
}
