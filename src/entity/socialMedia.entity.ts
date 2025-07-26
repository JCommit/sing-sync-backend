import { SocialMediaType } from 'src/entity/socialMediaType.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SocialMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SocialMediaType, { nullable: false })
  socialMediaType: SocialMediaType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
