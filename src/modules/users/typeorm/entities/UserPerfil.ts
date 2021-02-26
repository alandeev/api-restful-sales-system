import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import Upload from './Upload';
import User from './User';

@Entity('user_perfils')
class UserPerfil {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude()
  @JoinColumn()
  @OneToOne((type) => Upload, { cascade: true })
  avatar: Upload;

  @OneToOne(() => User, (user) => user.perfil) // specify inverse side as a second parameter
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar.filename}`;
  }
}

export default UserPerfil;
