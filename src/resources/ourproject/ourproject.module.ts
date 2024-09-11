import { Module } from '@nestjs/common';
import { OurprojectService } from './ourproject.service';
import { OurprojectController } from './ourproject.controller';

@Module({
  controllers: [OurprojectController],
  providers: [OurprojectService],
})
export class OurprojectModule {}
