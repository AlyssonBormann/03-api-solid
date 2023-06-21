import { beforeEach, describe, expect, test } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })

  test('should be able to create', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Test',
      description: 'Gym Training',
      phone: '6999999999',
      latitude: -10.7678496,
      longitude: -65.3320079,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
