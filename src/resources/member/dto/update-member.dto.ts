import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/resources/util/enum';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @ApiProperty({
    title: 'The name of member',
    example: 'Merry Jackson',
  })
  name: string;

  @ApiProperty({
    title: 'The role of member',
    example: 'Volonter',
  })
  role: string;

  @ApiProperty({
    description: 'A brief description of the member',
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
