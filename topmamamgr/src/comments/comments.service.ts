import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private dataSource: DataSource,
  ) {}

  // create a new comment for a book
  async create(payload: CreateCommentDto, ipAddress: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    // start a database transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newComment = new Comment();
      newComment.bookID = payload.bookID;
      newComment.text = payload.text;
      newComment.createdAt = new Date();
      newComment.updatedAt = new Date();
      newComment.IPAddress = ipAddress ?? '127.0.0.1';

      await queryRunner.manager.save(newComment);

      // check if we have a book created with comment count
      const book = await queryRunner.manager
        .getRepository(Book)
        .createQueryBuilder('book')
        .where('book.bookID = :id', { id: payload.bookID })
        .getOne();

      // check if book is available
      if (book) {
        // increment the comment count
        await queryRunner.manager
          .getRepository(Book)
          .createQueryBuilder()
          .update(Book)
          .set({
            commentcount: () => 'commentcount + 1',
          })
          .where('bookID = :id', { id: payload.bookID })
          .execute();
      } else {
        // create the book with comment count
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Book)
          .values({ bookID: payload.bookID, commentcount: 1 })
          .execute();
      }

      await queryRunner.commitTransaction();

      return newComment;
    } catch (err) {
      console.log('err', err);
      
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException('Something went wrong!', HttpStatus.FORBIDDEN);
    } finally {
      await queryRunner.release();
      // you need to release a queryRunner which was manually instantiated
      // throw new HttpException('Something went wrong!', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async findAll() {
    // No pagination done for this API since this is a test project and not part of the requirement.
    return this.commentRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
