import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { Member, MemberSchema } from './entities/member.entity';
import { ImageSchema, Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImageModule,
  ],

  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
