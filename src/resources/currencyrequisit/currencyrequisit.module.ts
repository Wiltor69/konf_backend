import { Module } from '@nestjs/common';
import { CurrencyrequisitService } from './currencyrequisit.service';
import { CurrencyrequisitController } from './currencyrequisit.controller';
import {
  Currencyrequisit,
  CurrencyrequisitSchema,
} from './entities/currencyrequisit.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentGroupModule } from '../content-group/content-group.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currencyrequisit.name, schema: CurrencyrequisitSchema },
    ]),
    ContentGroupModule,
  ],

  controllers: [CurrencyrequisitController],
  providers: [CurrencyrequisitService],
  exports: [CurrencyrequisitService],
})
export class CurrencyrequisitModule {}
