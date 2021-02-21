import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import Upload from './Upload';
import User from './User';

@Entity('user_perfils')
class UserPerfil {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn()
  @OneToOne(type => Upload, { cascade: true })
  avatar: Upload;

  @OneToOne(() => User, user => user.perfil) // specify inverse side as a second parameter
  user: User

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserPerfil;
