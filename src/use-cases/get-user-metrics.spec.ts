import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeAll(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository)
  })

  test('should be able to get check-ins count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-03',
    })

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-03',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-03',
    })

    expect(checkInsCount).toEqual(2)
  })
})
