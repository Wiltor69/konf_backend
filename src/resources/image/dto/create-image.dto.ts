import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    description: 'A brief description of the image',
    example: 'A beautiful landscape',
    required: false,
  })
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
