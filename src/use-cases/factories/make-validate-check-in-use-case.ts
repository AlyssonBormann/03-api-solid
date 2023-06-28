import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidadeCheckInUseCase } from '../validate-check-in'

export function MakeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidadeCheckInUseCase(
    prismaCheckInsRepository,
  )

  return validateCheckInUseCase
}
