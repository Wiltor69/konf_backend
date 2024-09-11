import { PartialType } from '@nestjs/swagger';
import { CreateOurprojectDto } from './create-ourproject.dto';

export class UpdateOurprojectDto extends PartialType(CreateOurprojectDto) {}
