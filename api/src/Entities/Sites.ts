import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { User } from './User';
import { Cms } from './Cms';

@Entity('Sites')
export class Site {

  @PrimaryGeneratedColumn('uuid',)
  id: string;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  url: string;

  @Column({default: ''})
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({default: ''})
  severity: string;

  @Column({default: ''})
  status: string;

  @Column({default: ''})
  snapshotUrl: string;

  @CreateDateColumn()
  scannedAt: Date;

  @Column({default: ''})
  version: string;

  // eslint-disable-next-line no-unused-vars
  @ManyToOne(type => User, user => user.sites)
  user: User;
  // eslint-disable-next-line no-unused-vars
  @ManyToOne(type => Cms, cms => cms.sites)
  cms: Cms;

}
