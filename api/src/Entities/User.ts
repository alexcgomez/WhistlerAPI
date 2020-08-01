import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  password: string;
}
