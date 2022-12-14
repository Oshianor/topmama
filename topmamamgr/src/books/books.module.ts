import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { HttpModule } from '@nestjs/axios';
// import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), HttpModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
