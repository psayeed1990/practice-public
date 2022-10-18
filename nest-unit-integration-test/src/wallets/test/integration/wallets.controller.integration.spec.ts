import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { CreateWalletRequest } from '../../dto/request/create-wallet-request.dto';
import { walletStub } from '../stubs/wallet.stub';

describe('WalletsController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('wallets').deleteMany({});
  });

  describe('getWallets', () => {
    it('should return an array of wallets', async () => {
      await dbConnection.collection('wallets').insertOne(walletStub());
      const response = await request(httpServer).get('/wallets');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([walletStub()]);
    });
  });

  describe('createWallet', () => {
    it('should create a wallet', async () => {
      const createWalletRequest: CreateWalletRequest = {
        email: walletStub().email,
        age: walletStub().age,
      };
      const response = await request(httpServer)
        .post('/wallets')
        .send(createWalletRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createWalletRequest);

      const wallet = await dbConnection
        .collection('wallets')
        .findOne({ email: createWalletRequest.email });
      expect(wallet).toMatchObject(createWalletRequest);
    });
  });
});
