import { ApiProperty } from '@nestjs/swagger';

export class CreateWorthDto {
  @ApiProperty({
    description: 'The text of the worth',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    required: true,
  })
  textWorth: string;
}
