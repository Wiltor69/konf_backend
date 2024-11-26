import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './resources/main/main.module';
import { MongooseModule } from './db/mongoose.module';
import { WorthModule } from './resources/worth/worth.module';
import { ContactModule } from './resources/contact/contact.module';
import { ImageModule } from './resources/image/image.module';
import { EventsModule } from './resources/events/events.module';
import { HelpModule } from './resources/help/help.module';
import { PartnerModule } from './resources/partner/partner.module';
import { AboutUsModule } from './resources/about_us/about_us.module';

import { SectionaboutModule } from './resources/sectionabout/sectionabout.module';
import { MemberModule } from './resources/member/member.module';
import { OurprojectModule } from './resources/ourproject/ourproject.module';
import { ProjectModule } from './resources/project/project.module';
import { RequisitModule } from './resources/requisit/requisit.module';

import { VolontirModule } from './resources/volontir/volontir.module';
import { SectionvolontirModule } from './resources/sectionvolontir/sectionvolontir.module';
import { ContentGroupModule } from './resources/content-group/content-group.module';
import { ReportModule } from './resources/report/report.module';
import { GalleryModule } from './resources/gallery/gallery.module';
import { CurrencyrequisitModule } from './resources/currencyrequisit/currencyrequisit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SectionaboutModule,
    MemberModule,
    MainModule,
    MongooseModule,
    WorthModule,
    ContactModule,
    ImageModule,
    EventsModule,
    HelpModule,
    PartnerModule,
    AboutUsModule,
    OurprojectModule,
    ProjectModule,
    RequisitModule,

    VolontirModule,
    SectionvolontirModule,
    ContentGroupModule,
    ReportModule,
    GalleryModule,
    CurrencyrequisitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
