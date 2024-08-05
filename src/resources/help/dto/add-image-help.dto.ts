import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Image } from 'src/resources/image/entities/image.entity';

export class AddImageHelpDto {
  @ApiProperty({
    description: 'This is Image',
    example: '{}',
    required: false,
  })
  @Type(() => Image)
  image?: Image;

  @ApiProperty({
    description: 'Title Help',
    example: 'Help all people',
  })
  titleHelp: string;
}
