import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestMongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        //reconnection is automate, but if you want to config it uncomment text below and manage it
        //retryAttempts: 5, // Number of retry attempts
        //retryDelay: 3000, // Delay between retries in milliseconds (3 seconds in this case)
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongooseModule {}
