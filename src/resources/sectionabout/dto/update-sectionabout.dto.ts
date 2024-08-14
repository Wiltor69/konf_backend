import { PartialType } from '@nestjs/swagger';
import { CreateSectionaboutDto } from './create-sectionabout.dto';

export class UpdateSectionaboutDto extends PartialType(CreateSectionaboutDto) {}
