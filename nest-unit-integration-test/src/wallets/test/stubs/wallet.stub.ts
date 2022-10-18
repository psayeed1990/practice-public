import { Wallet } from '../../schemas/Wallet';

export const walletStub = (): Wallet => {
  return {
    walletId: '123',
    email: 'test@example.com',
    age: 23,
    favoriteFoods: ['apples', 'pizza'],
  };
};
