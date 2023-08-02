import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/utils/role.enum';
import { Roles } from 'src/guard/role.decorator';

@Controller('Books')
export class BookController {
  constructor(private readonly bookProvider: BookService) {}
  @Get()
  async getBooks() {
    return this.bookProvider.getBooks();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async addBook(@Body() body: CreateBookDto) {
    return this.bookProvider.addBook(body);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.bookProvider.getById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async deleteBook(@Param('id') id: string) {
    return this.bookProvider.deleteBook(id);
  }
}
