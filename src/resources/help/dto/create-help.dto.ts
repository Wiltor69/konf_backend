import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class CreateHelpDto {
  @ApiProperty({
    description: 'Title Help',
    example: 'Help all people',
  })
  titleHelp: string;

  @ApiProperty({
    description: 'This is id of Image',
    example: '362876387467846',
  })
  imageHelpId: string;

  @ApiProperty({
    description: 'This is the language',
    example: 'ua',
    required: true,
  })
  @IsOptional()
  @IsEnum(ELanguage)
  language: ELanguage;
}
