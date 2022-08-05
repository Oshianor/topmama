import { IsOptional, IsEnum, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCharacterDto {
  @ApiProperty({
    example: 'name:desc',
  })
  @IsEnum([
    'name:desc',
    'gender:desc',
    'age:desc',
    'name:asc',
    'gender:asc',
    'age:asc',
  ])
  @IsOptional()
  @IsString()
  sort: string;

  @ApiProperty({
    example: 'male',
  })
  @IsString()
  @IsEnum([
    'male',
    'female',
  ])
  @IsOptional()
  filter: string;
}
