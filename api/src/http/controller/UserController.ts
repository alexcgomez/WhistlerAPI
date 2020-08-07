import { getManager, Repository } from 'typeorm/index';
import { User } from '../../Entities/User';

export class UserController {
  private userRepository: Repository<User>
  constructor() {
    this.userRepository = getManager().getRepository(User);
  }
  getAllUsers():Promise<User[]>{
     return this.userRepository.createQueryBuilder('User').getMany();
  }



}
