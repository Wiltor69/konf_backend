import { ApiProperty } from '@nestjs/swagger';

export class CreateHelpDto {
  @ApiProperty({
    description: 'Title Help',
    example: 'Help all people',
  })
  titleHelpEN: string;

  @ApiProperty({
    description: 'Title Help',
    example: 'Help all people',
  })
  titleHelpUA: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageHelpId: string;
}
