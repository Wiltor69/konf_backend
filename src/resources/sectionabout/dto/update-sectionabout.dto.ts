import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSectionaboutDto } from './create-sectionabout.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateSectionaboutDto extends PartialType(CreateSectionaboutDto) {
  @ApiProperty({
    title: 'Title Section element',
    example: 'New element',
  })
  titleElement: string;

  @ApiProperty({
    description: 'A brief description of the element',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageId: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;
}
