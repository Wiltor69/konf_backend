import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty({
    description: 'Web company',
    example: 'http://google.com',
  })
  webPatner?: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imagePartnerId: string;
}
