import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';
import { promises } from 'dns';

@Injectable()
export class BookService {
  constructor(@InjectModel('Books') private bookModel: Model<Book>) {}

  async getBooks(): Promise<Book[]> {
    const res = await this.bookModel.find();
    return res;
  }

  async getById(id: string): Promise<Book> {
    const res = await this.bookModel.findById(id);
    if (!res) {
      throw new NotFoundException('Book Not Found');
    }
    return res;
  }

  async addBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async deleteBook(id: string): Promise<Book> {
    const res = await this.bookModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('Book Not Found');
    }
    return res;
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    const res = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    return res;
  }
}
