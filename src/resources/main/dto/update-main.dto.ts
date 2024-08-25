import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMainDto } from './create-main.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateMainDto extends PartialType(CreateMainDto) {
  @ApiProperty({
    title: 'Title Main',
    example: 'Main',
  })
  titleMain: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  description: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;
}
