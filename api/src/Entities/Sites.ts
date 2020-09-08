import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity('Sites')
export class Site {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({unique: true})
  description: string;

  @CreateDateColumn()
  createdAt: Date;

}
