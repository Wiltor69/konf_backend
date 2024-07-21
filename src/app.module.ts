import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './resources/main/main.module';
import { MongooseModule } from './db/mongoose.module';
import { WorthModule } from './resources/worth/worth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MainModule,
    MongooseModule,
    WorthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
