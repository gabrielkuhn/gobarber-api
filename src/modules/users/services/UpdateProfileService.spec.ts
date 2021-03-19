import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider

let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      email: 'johntre@example.com.br',
    })

    expect(updatedUser.name).toBe('John Tré')
    expect(updatedUser.email).toBe('johntre@example.com.br')
  })

  it('should not be able to change the e-mail to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Donald Duck',
      email: 'donaldduck@example.com',
      password: '123123',
    })

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tré',
        email: 'donaldduck@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      email: 'johntre@example.com.br',
      old_password: '123123',
      password: '123456',
    })

    expect(updatedUser.password).toBe('123456')
  })

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tré',
        email: 'johntre@example.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with the wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tré',
        email: 'johntre@example.com.br',
        old_password: 'wrong-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
