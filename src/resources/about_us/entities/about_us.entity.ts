import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Heroabout } from 'src/resources/heroabout/entities/heroabout.entity';
import { Member } from 'src/resources/member/entities/member.entity';
import { Sectionabout } from 'src/resources/sectionabout/entities/sectionabout.entity';

export type AboutUsDocument = HydratedDocument<AboutUs>;
@Schema()
export class AboutUs {
  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  @Prop({ required: true })
  titleAboutUA: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  descriptionUA: string;

  @ApiProperty({
    title: 'Title About us',
    example: 'About us',
  })
  @Prop({ required: true })
  titleAboutEN: string;

  @ApiProperty({
    description: 'This information about company',
    example: 'Ea cupiditate aperiam possimus sed voluptates reiciendis harum.',
  })
  @Prop({ required: true })
  descriptionEN: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Heroabout' }] })
  heroAbout: Heroabout[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sectionabout' }],
  })
  sectionAbout: Sectionabout[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }] })
  member: Member[];
}
export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);
