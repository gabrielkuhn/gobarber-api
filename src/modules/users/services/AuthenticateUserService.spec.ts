import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

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
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    expect(
      authenticateUser.execute({
        email: 'donaldtheduck@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with a invalid password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    await createUser.execute({
      name: 'Donald Duck',
      email: 'donaldtheduck@example.com',
      password: '123123',
    })

    expect(
      authenticateUser.execute({
        email: 'donaldtheduck@example.com',
        password: 'wrongpass123',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
