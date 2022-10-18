import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Wallet, WalletSchema } from './schemas/Wallet';
import { WalletsController } from './wallets.controller';
import { WalletsRepository } from './wallets.repository';
import { WalletsService } from './wallets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  controllers: [WalletsController],
  providers: [WalletsService, WalletsRepository],
})
export class WalletsModule {}
