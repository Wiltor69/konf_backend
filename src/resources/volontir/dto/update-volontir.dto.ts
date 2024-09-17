import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVolontirDto } from './create-volontir.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateVolontirDto extends PartialType(CreateVolontirDto) {
  @ApiProperty({
    description: 'This information about volontirs',
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
