import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateWalletRequest } from './dto/request/create-wallet-request.dto';
import { UpdateWalletRequest } from './dto/request/update-wallet-request.dto';

import { Wallet } from './schemas/Wallet';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get(':walletId')
  async getWallet(@Param('walletId') walletId: string): Promise<Wallet> {
    return this.walletsService.getWallet({ walletId });
  }

  @Get()
  async getWallets(): Promise<Wallet[]> {
    return this.walletsService.getWallets();
  }

  @Post()
  async createWallet(
    @Body() createWalletRequest: CreateWalletRequest,
  ): Promise<Wallet> {
    return this.walletsService.createWallet(createWalletRequest);
  }

  @Patch(':walletId')
  async updateWallet(
    @Param('walletId') walletId: string,
    @Body() updateWalletRequest: UpdateWalletRequest,
  ): Promise<Wallet> {
    return this.walletsService.updateWallet({
      walletId,
      ...updateWalletRequest,
    });
  }
}
