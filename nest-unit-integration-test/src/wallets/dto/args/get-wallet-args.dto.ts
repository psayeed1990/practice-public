import { IsNotEmpty } from 'class-validator';

export class GetWalletArgs {
  @IsNotEmpty()
  walletId: string;
}
