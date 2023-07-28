import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({},{message: "Incorrect email "})
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
