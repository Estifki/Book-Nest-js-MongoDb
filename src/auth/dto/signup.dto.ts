import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from 'src/utils/role.enum';

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

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role
}
