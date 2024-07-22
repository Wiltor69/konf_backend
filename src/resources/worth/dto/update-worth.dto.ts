import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorthDto } from './create-worth.dto';

export class UpdateWorthDto extends PartialType(CreateWorthDto) {
  @ApiProperty({
    description: 'The text of the worth',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    required: false,
  })
  textWorth: string;
}
