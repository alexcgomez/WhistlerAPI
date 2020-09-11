import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

const bcrypt = require('bcryptjs');

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

  public async encryptPassword(pass: string) {
    return await bcrypt.hash(pass, bcrypt.genSaltSync(10));
  }

  public async comparePassword(pass: string) {
    return await bcrypt.compare(pass, this.password);
  }
}

