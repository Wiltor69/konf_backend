import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact, ContactSchema } from './entities/contact.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    ContentGroupModule,
  ],
  exports: [ContactService],
})
export class ContactModule {}
