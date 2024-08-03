import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty({
    description: 'Web company',
    example: 'http://google.com',
  })
  webPatner?: string;

  @ApiProperty({
    type: 'string',
  })
  imagePartnerId: string;
}
