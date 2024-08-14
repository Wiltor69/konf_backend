import { PartialType } from '@nestjs/swagger';
import { CreateHeroaboutDto } from './create-heroabout.dto';

export class UpdateHeroaboutDto extends PartialType(CreateHeroaboutDto) {}
