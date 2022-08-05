import {
  BadRequestException,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { GetCharacterDto } from './dto/get-character.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as lodash from 'lodash';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  async getCharacters() {
    try {
      // make API call to get intent behind the message
      const val = await lastValueFrom(
        this.httpService.get(`${process.env.BASE_API}/characters`),
      );

      const intent = val.data;

      return intent;
    } catch (error) {
      if (error.response) {
        throw new HttpException('Something went wrong!', HttpStatus.FORBIDDEN);
      }
    }
  }

  async findAll(payload: GetCharacterDto) {
    // get the characters from the API
    let charaters = await this.getCharacters();

    // check if the sort is passed
    if (payload.sort) {
      const sorted: any = payload.sort.split(':');
      charaters = lodash.orderBy(charaters, [sorted[0]], [sorted[1]]);
    }

    if (payload.filter) {
      charaters = lodash.filter(charaters, function (o) {
        return (
          o.gender.toLocaleLowerCase() === payload.filter.toLocaleLowerCase()
        );
      });
    }

    return charaters;
  }
}
