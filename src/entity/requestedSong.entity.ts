import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'uuid' })
  sessionId: string;
}
