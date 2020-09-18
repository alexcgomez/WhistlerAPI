import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { compare, genSaltSync, hash } from 'bcryptjs';
import { Site } from './Sites';


@Entity('Users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({default: false})
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line no-unused-vars
  @OneToMany(type => Site, site => site.user)
  sites: Site[];

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public async encryptPassword(pass: string): Promise<string> {
    return await hash(pass, genSaltSync(10));
  }

  public async comparePassword(pass: string): Promise<boolean> {
    return await compare(pass, this.password);
  }
}

