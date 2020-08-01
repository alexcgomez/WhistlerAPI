import { User } from '../Entities/User';
import { getManager } from 'typeorm/index';

export class UserRespository {

  createUser(user: User): Promise<User> {
    return getManager().getRepository(User).save(user);
  }

  getUsers(): Promise<User[]> {
    return getManager().getRepository(User).createQueryBuilder('User')
      .select(['User.id', 'User.firstName', 'User.lastName', 'User.email'])
      .getMany();
  }

  getUser(userId: number): Promise<User> {
    return getManager().getRepository(User).findOne({
      where: {
        id: userId,
      },
    });
  }

  updateUser(userId: string, newUser: User): Promise<UpdateResult> {
    return getManager().getRepository(User).update({id: userId}, newUser);
  }

  deleteUser(userId: string): Promise<DeleteResult> {
    return getManager().getRepository(User).delete({id: userId});
  }
}
