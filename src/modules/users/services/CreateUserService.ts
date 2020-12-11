import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if (checkUsersExists) {
      throw new AppError('Email adress is already in use.')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

export default CreateUserService