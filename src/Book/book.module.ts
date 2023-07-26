import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from './schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Books',
        schema: bookSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
