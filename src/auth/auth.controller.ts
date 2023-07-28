import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() signUpBody: SignUpDto) {
    return this.authService.signUp(signUpBody);
  }
  @Get('/login')
  async login(@Body() loginBody: LoginDto) {
    return this.authService.login(loginBody);
  }

  // @Get('/users')
  // async getUsers() {
  //   return this.authService.getAllUsers();
  // }
}
