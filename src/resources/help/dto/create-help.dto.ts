import { ApiProperty } from '@nestjs/swagger';

export class CreateHelpDto {
  @ApiProperty({
    description: 'Title Help',
    example: 'Help all people',
  })
  titleHelp: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageHelp: string;
}
