import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    description: 'The URL of the image',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  url?: string;

  @ApiProperty({
    description: 'A brief description of the image',
    example: 'A beautiful landscape',
    required: false,
  })
  description?: string;
}
