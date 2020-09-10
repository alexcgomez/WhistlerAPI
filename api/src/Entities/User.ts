import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

const bcrypt = require('bcrypt');

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

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public encryptPassword(pass: string): string {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
  }

  public comparePassword(pass: string): boolean {
    return bcrypt.compareSync(pass, this.password);
  }
}

