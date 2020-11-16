import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name:string;


  @Column()
  email:string;


  @Column()
  @Exclude()
  password:string;


  @Column()
  avatar:string;


  @CreateDateColumn()
  created_at:Date;


  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url '})
  getAvatarUrl(): string | null {

    if(!this.avatar){
      return null;
    }

    switch(uploadConfig.driver){
      case 'disk':
       return `${process.env.APP_API_URL}/files/${this.avatar}`;

      case 's3':
        return `http://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
      }

  }

/*  constructor({ provider, date}: Omit<User, 'id'>){
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }

  */
}

export default User;
