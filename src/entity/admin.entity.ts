import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SocialMedia } from './socialMedia.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  displayName: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.adminId, {
    nullable: true,
  })
  socialMedia: SocialMedia[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}
