import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('uploads')
class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  filename: string;

  @Column('int')
  size: number;

  @BeforeInsert()
  beforeInsert(data: any) {
    console.log({ data, teste: true })
  }
}

export default Upload;
