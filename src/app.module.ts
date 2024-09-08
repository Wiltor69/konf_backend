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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
