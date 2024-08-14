import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { Heroabout } from 'src/resources/heroabout/entities/heroabout.entity';
import { Member } from 'src/resources/member/entities/member.entity';
import { Sectionabout } from 'src/resources/sectionabout/entities/sectionabout.entity';

export class AddAllAboutDto {
  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  titleAboutUA: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionUA: string;

  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  titleAboutEN: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  descriptionEN: string;

  @ApiProperty({
    description: 'This is Hero',
    example: '{}',
    required: false,
  })
  @IsArray()
  @Type(() => Heroabout)
  heroAbout?: Heroabout[];

  @ApiProperty({
    description: 'This is Section',
    example: '{}',
    required: false,
  })
  @IsArray()
  @Type(() => Sectionabout)
  sectionAbout?: Sectionabout[];

  @ApiProperty({
    description: 'This is Member',
    example: '{}',
    required: false,
  })
  @IsArray()
  @Type(() => Member)
  member?: Member[];
}
