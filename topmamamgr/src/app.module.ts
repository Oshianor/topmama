import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { CommentsModule } from './comments/comments.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CharactersModule,
    CommentsModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
