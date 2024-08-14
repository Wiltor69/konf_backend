import { Module } from '@nestjs/common';
import { AboutUsService } from './about_us.service';
import { AboutUsController } from './about_us.controller';
import { AboutUs, AboutUsSchema } from './entities/about_us.entity';
import {
  Heroabout,
  HeroaboutSchema,
} from '../heroabout/entities/heroabout.entity';
import {
  Sectionabout,
  SectionaboutSchema,
} from '../sectionabout/entities/sectionabout.entity';
import { Member, MemberSchema } from '../member/entities/member.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroaboutModule } from '../heroabout/heroabout.module';
import { SectionaboutModule } from '../sectionabout/sectionabout.module';
import { MemberModule } from '../member/member.module';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AboutUs.name, schema: AboutUsSchema },
      { name: Heroabout.name, schema: HeroaboutSchema },
      { name: Sectionabout.name, schema: SectionaboutSchema },
      { name: Member.name, schema: MemberSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    HeroaboutModule,
    SectionaboutModule,
    MemberModule,
    ImageModule,
  ],

  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
