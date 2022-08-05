import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  bookID: number;

  @Column({ default: 0, type: 'integer' })
  commentcount: number;
}
