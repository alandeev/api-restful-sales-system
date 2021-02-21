import { EntityRepository, Repository } from 'typeorm';
import UserPerfil from '../entities/UserPerfil';

@EntityRepository(UserPerfil)
export class UserPerfilRepository extends Repository<UserPerfil> {
  findByUserId(user_id: string) { // preciso melhorar
    return this.findOne({
      where: { user_id }
    })
  }
}
