import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Admin } from './admin.entity';
import { RequestedSong } from './requestedSong.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  SessionId: string;

  @ManyToOne(() => Admin, (admin) => admin.sessions, {
    onDelete: 'CASCADE',
  })
  admin: Admin;

  @Column({ type: 'uuid' })
  adminId: string;

  @Column()
  SessionTitle: string;

  @Column({ type: 'timestamp' })
  StartTime: Date;

  @Column({ type: 'timestamp' })
  EndTime: Date;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;

  @Column({ type: 'int' })
  MaxSong: number;

  @Column({ type: 'boolean', default: false })
  requestStatus: boolean;

  @Column({ type: 'boolean', default: false })
  editStatus: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RequestedSong, (song) => song.sessionId)
  requestedSongs: RequestedSong[];
}
