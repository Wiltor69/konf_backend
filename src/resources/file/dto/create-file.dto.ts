import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    description: 'This is filename',
    required: true,
  })
  filename: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
