import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event, EventSchema } from './entities/event.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ImageModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
