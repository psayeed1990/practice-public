import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Wallet, WalletDocument } from './schemas/Wallet';

//Change this file to util folder

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async findOne(walletFilterQuery: FilterQuery<Wallet>): Promise<Wallet> {
    return this.walletModel.findOne(walletFilterQuery);
  }

  async find(walletsFilterQuery: FilterQuery<Wallet>): Promise<Wallet[]> {
    return this.walletModel.find(walletsFilterQuery);
  }

  async create(wallet: Wallet): Promise<Wallet> {
    const newWallet = new this.walletModel(wallet);
    return newWallet.save();
  }

  async findOneAndUpdate(
    walletFilterQuery: FilterQuery<Wallet>,
    wallet: Partial<Wallet>,
  ): Promise<Wallet> {
    return this.walletModel.findOneAndUpdate(walletFilterQuery, wallet, {
      new: true,
    });
  }
}
