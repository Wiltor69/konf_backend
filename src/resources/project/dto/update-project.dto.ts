import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    title: 'Title Project',
    example: 'Project',
  })
  titleProject: string;

  @ApiProperty({
    description: 'A brief description of the bold project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionBold: string;

  @ApiProperty({
    description: 'A brief description of the project',
  })
  description: string[];

  @ApiProperty({
    description: 'A brief description of the project',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
    required: false,
  })
  descriptionEnd: string;

  @ApiProperty({
    description: 'A brief description of the when',
    example: 'Data',
    required: false,
  })
  descriptionWhen: string;

  @ApiProperty({
    description: 'A brief description of the where',
    example: 'Place',
    required: false,
  })
  descriptionWhere: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageProjectId: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;

  @ApiPropertyOptional({
    description: 'contentGroupId',
    default: null,
  })
  contentGroupId: string;
}
