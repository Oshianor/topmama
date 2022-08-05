import {
  BadRequestException,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { GetBookDto } from './dto/get-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as lodash from "lodash"

@Injectable()
export class BooksService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getBooks() {
    try {
      // make API call to get intent behind the message
      const val = await lastValueFrom(
        this.httpService.get(`${process.env.BASE_API}/books`));

      const intent = val.data.reverse();

      return intent;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          "Something went wrong!",
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }

  async findAll() {
    // get the book list
    const books = await this.getBooks(); 
    // find all books with comment
    const track = await this.bookRepository.find();
    
    // iterate over the list
    const val = books.map((value, ) => {
      // identify the book ID
      const ID = value.url.split('/')[value.url.split('/').length - 1];
      // filter bok comment list
      let commet = lodash.keyBy(track, 'bookID')[ID];
      value.count = commet ? commet?.commentcount : 0;
      return value;
    });

    return val;
  }
}
