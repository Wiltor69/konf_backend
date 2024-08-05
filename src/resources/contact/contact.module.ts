import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact, ContactSchema } from './entities/contact.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
  exports: [ContactService],
})
export class ContactModule {}
