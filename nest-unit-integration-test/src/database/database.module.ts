import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { isTestnet } from '../utils/env/is-testnet.utils.env';
isTestnet;
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: isTestnet()
          ? configService.get<string>('MONGO_TEST_CONNECTION_URI')
          : configService.get<string>('MONGO_CONNECTION_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
