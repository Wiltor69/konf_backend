import { PartialType } from '@nestjs/swagger';
import { CreateWorthDto } from './create-worth.dto';

export class UpdateWorthDto extends PartialType(CreateWorthDto) {
  readonly text: string;
}
