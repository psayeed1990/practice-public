import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { Wallet } from '../schemas/Wallet';
import { WalletsRepository } from '../wallets.repository';
import { walletStub } from './stubs/wallet.stub';
import { WalletModel } from './support/wallet.model';

describe('WalletsRepository', () => {
  let walletsRepository: WalletsRepository;

  describe('find operations', () => {
    let walletModel: WalletModel;
    let walletFilterQuery: FilterQuery<Wallet>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          WalletsRepository,
          {
            provide: getModelToken(Wallet.name),
            useClass: WalletModel,
          },
        ],
      }).compile();

      walletsRepository = moduleRef.get<WalletsRepository>(WalletsRepository);
      walletModel = moduleRef.get<WalletModel>(getModelToken(Wallet.name));

      walletFilterQuery = {
        walletId: walletStub().walletId,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let wallet: Wallet;

        beforeEach(async () => {
          jest.spyOn(walletModel, 'findOne');
          wallet = await walletsRepository.findOne(walletFilterQuery);
        });

        test('then it should call the walletModel', () => {
          expect(walletModel.findOne).toHaveBeenCalledWith(walletFilterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a wallet', () => {
          expect(wallet).toEqual(walletStub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let wallets: Wallet[];

        beforeEach(async () => {
          jest.spyOn(walletModel, 'find');
          wallets = await walletsRepository.find(walletFilterQuery);
        });

        test('then it should call the walletModel', () => {
          expect(walletModel.find).toHaveBeenCalledWith(walletFilterQuery);
        });

        test('then it should return a wallet', () => {
          expect(wallets).toEqual([walletStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let wallet: Wallet;

        beforeEach(async () => {
          jest.spyOn(walletModel, 'findOneAndUpdate');
          wallet = await walletsRepository.findOneAndUpdate(
            walletFilterQuery,
            walletStub(),
          );
        });

        test('then it should call the walletModel', () => {
          expect(walletModel.findOneAndUpdate).toHaveBeenCalledWith(
            walletFilterQuery,
            walletStub(),
            { new: true },
          );
        });

        test('then it should return a wallet', () => {
          expect(wallet).toEqual(walletStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          WalletsRepository,
          {
            provide: getModelToken(Wallet.name),
            useValue: WalletModel,
          },
        ],
      }).compile();

      walletsRepository = moduleRef.get<WalletsRepository>(WalletsRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let wallet: Wallet;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(WalletModel.prototype, 'save');
          constructorSpy = jest.spyOn(WalletModel.prototype, 'constructorSpy');
          wallet = await walletsRepository.create(walletStub());
        });

        test('then it should call the walletModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(walletStub());
        });

        test('then it should return a wallet', () => {
          expect(wallet).toEqual(walletStub());
        });
      });
    });
  });
});
