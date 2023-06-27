import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, beforeEach, test, expect } from 'vitest'
import { ValidadeCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryCheckInRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase

describe('Validade Check-in Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(inMemoryCheckInRepository)
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
})
