import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Site } from './Sites';

@Entity('Cms')
export class Cms {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  url: string;

  @Column({default: ''})
  description: string;

  @Column({nullable: true})
  latestRelease: string;

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line no-unused-vars
  @OneToMany(type => Site, site => site.cms)
  sites: Site[];

}
