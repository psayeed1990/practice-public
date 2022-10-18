import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateWalletInput {
  @IsNotEmpty()
  walletId: string;

  @IsOptional()
  @IsNotEmpty()
  age?: number;

  @IsOptional()
  isSubscribed?: boolean;
}
