import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpBody): Promise<{
    user: User;
    token: string;
  }> {
    const { username, email, password } = signUpBody;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return {
      user: user,
      token: token,
    };
  }

  async login(loginBody) {
    const { email, password } = loginBody;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }
    const token = this.jwtService.sign({ id: user._id });

    return {
      user: user,
      token: token,
    };
  }

  // async getAllUsers(): Promise<User[]>{
  //   return this.userModel.find();
  // }
}
