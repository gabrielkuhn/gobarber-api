import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService
let createUser: CreateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Donald Duck',
      email: 'donaldtheduck@example.com',
      password: '123123',
    })

    const authResponse = await authenticateUser.execute({
      email: 'donaldtheduck@example.com',
      password: '123123',
    })

    expect(authResponse).toHaveProperty('token')
    expect(authResponse.user).toEqual(user)
  })

  it('should not be able to authenticate with a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'donaldtheduck@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with a invalid password', async () => {
    await createUser.execute({
      name: 'Donald Duck',
      email: 'donaldtheduck@example.com',
      password: '123123',
    })

    await expect(
      authenticateUser.execute({
        email: 'donaldtheduck@example.com',
        password: 'wrongpass123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
