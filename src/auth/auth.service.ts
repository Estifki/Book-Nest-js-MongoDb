import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpBody: SignUpDto): Promise<{
    user: User;
    token: string;
  }> {
    const { email } = signUpBody;
    const validEmail = await this.userModel.findOne({ email });

    if (validEmail) {
      throw new ConflictException('Email Already Exist!');
    }
    const hashedPassword = await bcrypt.hash(signUpBody.password, 10);

    const user = await this.userModel.create({
      ...signUpBody,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return {
      user: user,
      token: token,
    };
  }

  async login(loginBody: LoginDto) {
    const { email, password } = loginBody;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }
    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return {
      user: user,
      token: token,
    };
  }

 
}
