import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create';

@Controller('Books')
export class BookController {
  constructor(private readonly bookProvider: BookService) {}
  @Get()
  async getBooks() {
    return this.bookProvider.getBooks();
  }

  @Post()
  async addBook(@Body() body: CreateBookDto) {
    return this.bookProvider.addBook(body);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.bookProvider.getById(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookProvider.deleteBook(id);
  }
}
