import { MockModel } from '../../../database/test/support/mock.model';
import { Wallet } from '../../schemas/Wallet';
import { walletStub } from '../stubs/wallet.stub';

export class WalletModel extends MockModel<Wallet> {
  protected entityStub = walletStub();
}
