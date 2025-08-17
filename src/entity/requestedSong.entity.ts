import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Session } from './session.entity';

@Entity()
export class RequestedSong {
  @PrimaryGeneratedColumn('uuid')
  requestSongId: string;

  @Column({ type: 'varchar', length: 100 })
  songStatus: string;

  @Column()
  createTime: Date;

  @Column()
  updateTime: Date;

  @Column()
  viewerId: string;

  // @ManyToOne(() => Session, (session) => session.requestedSongs,{
  //   onDelete: 'CASCADE',
  // })
  // session: Session;

  @Column({ type: 'uuid'})
  sessionId: string;
}
