import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })

  test('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -10.7926873,
      longitude: -65.3322325,
    })

    await inMemoryGymsRepository.create({
      title: 'For Gym',
      description: null,
      phone: null,
      latitude: -8.7625496,
      longitude: -63.8888535,
    })

    const { gyms } = await sut.execute({
      userLatitude: -10.7833048,
      userLongitude: -65.3274016,
    })

    expect(gyms).toHaveLength(1)
  })
})
