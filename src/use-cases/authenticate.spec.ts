import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  test('should be able to authenticate', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('it should not be able to authenticate with wrong email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'johndoe@error.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('it should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'johndoe@error.com',
        password: '12345678',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
