import { IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookDto {
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  bookID: number;

  @ApiProperty({
    example: 'Just a little comment',
  })
  @IsString()
  @MaxLength(500)
  text: string;
}
