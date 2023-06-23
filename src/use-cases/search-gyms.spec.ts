import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  test('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -10.7678496,
      longitude: -65.3320079,
    })

    await inMemoryGymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -10.7678496,
      longitude: -65.3320079,
    })

    const { gyms } = await sut.execute({ query: 'Javascript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  test('should be able to search paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -10.7678496,
        longitude: -65.3320079,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })
})
