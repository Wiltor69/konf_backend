import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/resources/image/entities/image.entity';

export class AddImageDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  image?: Image;

  @ApiProperty({
    description: 'Web company',
    example: 'http://google.com',
    required: false,
  })
  webPatner?: string;
}
