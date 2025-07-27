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
export class SocialMediaType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(
    () => SocialMedia,
    (socialMedia) => socialMedia.socialMediaTypeId,
    {
      nullable: true,
    },
  )
  socialMedia: SocialMedia[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
