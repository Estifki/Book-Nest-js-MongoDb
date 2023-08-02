
import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsEnum(Role, {message: "This Role Is Not Known"})
  role: Role
}
