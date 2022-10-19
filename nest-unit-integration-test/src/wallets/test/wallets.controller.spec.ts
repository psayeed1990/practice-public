import { Test } from '@nestjs/testing';
import { CreateWalletRequest } from '../dto/request/create-wallet-request.dto';
import { UpdateWalletRequest } from '../dto/request/update-wallet-request.dto';
import { Wallet } from '../schemas/Wallet';

import { WalletsController } from '../wallets.controller';
import { WalletsService } from '../wallets.service';
import { walletStub } from './stubs/wallet.stub';

jest.mock('../wallets.service');

describe('WalletsController', () => {
  let walletsController: WalletsController;
  let walletsService: WalletsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [WalletsController],
      providers: [WalletsService],
    }).compile();

    walletsController = moduleRef.get<WalletsController>(WalletsController);
    walletsService = moduleRef.get<WalletsService>(WalletsService);
    jest.clearAllMocks();
  });

  describe('getWallet', () => {
    describe('when getWallet is called', () => {
      let wallet: Wallet;

      beforeEach(async () => {
        wallet = await walletsController.getWallet(walletStub().walletId);
      });

      test('then it should call walletsService', () => {
        expect(walletsService.getWallet).toBeCalledWith(walletStub().walletId);
      });

      test('then is should return a wallet', () => {
        expect(wallet).toEqual(walletStub());
      });
    });
  });

  describe('getWallets', () => {
    describe('when getWallets is called', () => {
      let wallets: Wallet[];

      beforeEach(async () => {
        wallets = await walletsController.getWallets();
      });

      test('then it should call walletsService', () => {
        expect(walletsService.getWallets).toHaveBeenCalled();
      });

      test('then it should return wallets', () => {
        expect(wallets).toEqual([walletStub()]);
      });
    });
  });

  describe('createWallet', () => {
    describe('when createWallet is called', () => {
      let wallet: Wallet;
      let createWalletDto: CreateWalletRequest;

      beforeEach(async () => {
        createWalletDto = {
          email: walletStub().email,
          age: walletStub().age,
        };
        wallet = await walletsController.createWallet(createWalletDto);
      });

      test('then it should call walletsService', () => {
        expect(walletsService.createWallet).toHaveBeenCalledWith(
          createWalletDto.email,
          createWalletDto.age,
        );
      });

      test('then it should return a wallet', () => {
        expect(wallet).toEqual(walletStub());
      });
    });
  });

  describe('updateWallet', () => {
    describe('when updateWallet is called', () => {
      let wallet: Wallet;
      let updateWalletDto: UpdateWalletRequest;

      beforeEach(async () => {
        updateWalletDto = {
          age: 98,
          favoriteFoods: ['pizza'],
        };
        wallet = await walletsController.updateWallet(
          walletStub().walletId,
          updateWalletDto,
        );
      });

      test('then it should call walletsService', () => {
        expect(walletsService.updateWallet).toHaveBeenCalledWith(
          walletStub().walletId,
          updateWalletDto,
        );
      });

      test('then it should return a wallet', () => {
        expect(wallet).toEqual(walletStub());
      });
    });
  });
});
