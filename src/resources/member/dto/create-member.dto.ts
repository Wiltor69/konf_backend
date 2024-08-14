import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  nameUA: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  roleUA: string;

  @ApiProperty({
    description: 'A brief description of the member',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionUA: string;

  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  nameEN: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  roleEN: string;

  @ApiProperty({
    description: 'A brief description of the member',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionEN: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageId: string;
}
