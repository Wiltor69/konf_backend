import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainController } from './main.controller';
import { Main, MainSchema } from './entities/main.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { WorthModule } from '../worth/worth.module';
import { EventsModule } from '../events/events.module';
import { ContactModule } from '../contact/contact.module';
import { PartnerModule } from '../partner/partner.module';
import { HelpModule } from '../help/help.module';
import { EventSchema, Event } from '../events/entities/event.entity';
import { Worth, WorthSchema } from '../worth/entities/worth.entity';
import { Partner, PartnerSchema } from '../partner/entities/partner.entity';
import { Help, HelpSchema } from '../help/entities/help.entity';
import { Contact, ContactSchema } from '../contact/entities/contact.entity';
import { ImageModule } from '../image/image.module';
import { ImageSchema, Image } from '../image/entities/image.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Main.name, schema: MainSchema },
      { name: Event.name, schema: EventSchema },
      { name: Worth.name, schema: WorthSchema },
      { name: Partner.name, schema: PartnerSchema },
      { name: Help.name, schema: HelpSchema },
      { name: Contact.name, schema: ContactSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    WorthModule,
    EventsModule,
    ContactModule,
    PartnerModule,
    HelpModule,
    ImageModule,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
