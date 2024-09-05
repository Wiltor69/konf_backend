import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOurprojectDto } from './create-ourproject.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateOurprojectDto extends PartialType(CreateOurprojectDto) {
  @ApiProperty({
    description: 'Title Our project',
    example: 'Our project',
  })
  titleOurProject: string;

  @ApiProperty({
    description: 'A brief description of the our project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageOuProjectId: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;
}
