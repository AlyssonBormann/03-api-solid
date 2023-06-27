import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, beforeEach, test, expect, vi, afterEach } from 'vitest'
import { ValidadeCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase

describe('Validade Check-in Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(inMemoryCheckInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to validate the check-in ', async () => {
    const createdCheckIn = await inMemoryCheckInRepository.create({
      gym_id: 'gym-09',
      user_id: 'user-09',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckInRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  test('should not be able to validate and inexistent check-in ', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  test('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const createdCheckIn = await inMemoryCheckInRepository.create({
      gym_id: 'gym-09',
      user_id: 'user-09',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
