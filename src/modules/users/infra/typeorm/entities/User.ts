import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'

import uploadConfig from '@config/upload'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  @Exclude()
  password: string

  @Column()
  email: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  get avatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}

export default User
