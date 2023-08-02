import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/guard/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async getAllUser() {
    return await this.userService.getAllUsers();
  }
}
