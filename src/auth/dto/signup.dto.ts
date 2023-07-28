import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: string;


  @IsNotEmpty()
  @IsEmail({},{message: ""})
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
