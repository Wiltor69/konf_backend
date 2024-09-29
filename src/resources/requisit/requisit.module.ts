import { Module } from '@nestjs/common';
import { RequisitService } from './requisit.service';
import { RequisitController } from './requisit.controller';
import { Requisit, RequisitSchema } from './entities/requisit.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Requisit.name, schema: RequisitSchema },
    ]),
    ContentGroupModule,
  ],
  controllers: [RequisitController],
  providers: [RequisitService],
  exports: [RequisitService],
})
export class RequisitModule {}
