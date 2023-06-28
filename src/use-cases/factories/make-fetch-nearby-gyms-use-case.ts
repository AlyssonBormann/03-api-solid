import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function MakeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const prismaFetchNearbyGymUseCase = new FetchNearbyGymsUseCase(
    prismaGymsRepository,
  )

  return prismaFetchNearbyGymUseCase
}
