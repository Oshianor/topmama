import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { GetCharacterDto } from './dto/get-character.dto';

@Controller('api/v1/characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async findAll(@Query() getCharacterDto: GetCharacterDto) {
    return await this.charactersService.findAll(getCharacterDto);
  }
}
