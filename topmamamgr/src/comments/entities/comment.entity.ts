import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  bookID: number;

  @Column()
  IPAddress: string;

  @Column({})
  text: string;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
