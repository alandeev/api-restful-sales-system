import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';

@Entity('user_tokens')
class UserTokens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('boolean')
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserTokens;
