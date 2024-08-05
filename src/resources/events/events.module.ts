import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event, EventSchema } from './entities/event.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '../image/image.module';
import { ImageSchema, Image } from '../image/entities/image.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
