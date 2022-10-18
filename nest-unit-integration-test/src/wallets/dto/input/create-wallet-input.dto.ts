import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateWalletInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  age: number;
}
