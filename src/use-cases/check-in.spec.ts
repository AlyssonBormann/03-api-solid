import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeAll(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(inMemoryCheckInsRepository, inMemoryGymsRepository)

    inMemoryGymsRepository.gyms.push({
      id: 'gym-01',
      title: 'javascript gym',
      phone: '',
      description: '',
      latitude: new Decimal(-10.7678496),
      longitude: new Decimal(-65.3320079),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -10.7678496,
      userLongitude: -65.3320079,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 5, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -10.7678496,
      userLongitude: -65.3320079,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -10.7678496,
        userLongitude: -65.3320079,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  test('should be able to check in twice but in different days', async () => {
    // vi.setSystemTime(new Date(2023, 5, 2, 8, 0, 0))

    // await sut.execute({
    //   gymId: 'gym-01',
    //   userId: 'user-01',
    //   userLatitude: -10.7678496,
    //   userLongitude: -65.3320079,
    // })

    vi.setSystemTime(new Date(2023, 5, 3, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -10.7678496,
      userLongitude: -65.3320079,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in on distant gym', async () => {
    inMemoryGymsRepository.gyms.push({
      id: 'gym-02',
      title: 'javascript gym',
      phone: '',
      description: '',
      latitude: new Decimal(-10.7653761),
      longitude: new Decimal(-65.2953112),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -10.7678496,
        userLongitude: -65.3320079,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
