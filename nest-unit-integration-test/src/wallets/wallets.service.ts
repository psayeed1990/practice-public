import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { GetWalletArgs } from './dto/args/get-wallet-args.dto';
import { CreateWalletInput } from './dto/input/create-wallet-input.dto';
import { UpdateWalletInput } from './dto/input/update-wallet-input.dto';
import { Wallet } from './schemas/Wallet';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async getWallet(getWalletArgs: GetWalletArgs): Promise<Wallet> {
    return this.walletsRepository.findOne(getWalletArgs);
  }

  async getWallets(): Promise<Wallet[]> {
    return this.walletsRepository.find({});
  }

  async createWallet(createWalletData: CreateWalletInput): Promise<Wallet> {
    return this.walletsRepository.create({
      walletId: uuidv4(),
      email: createWalletData.email,
      age: createWalletData.age,
      favoriteFoods: [],
    });
  }

  async updateWallet(updateWalletData: UpdateWalletInput): Promise<Wallet> {
    return this.walletsRepository.findOneAndUpdate(
      { walletId: updateWalletData.walletId },
      updateWalletData,
    );
  }
}
