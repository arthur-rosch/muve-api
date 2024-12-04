import { PrimasUsersRepository } from '../../../repositories/prisma'
import { CreateStripeCheckoutUseCase } from '../../cases/webhook-stripe/create-checkout-sessions'

export function makeCreateStripeCheckoutUseCase() {
  const usersRepository = new PrimasUsersRepository()

  const createStripeCheckoutUseCase = new CreateStripeCheckoutUseCase(
    usersRepository,
  )

  return createStripeCheckoutUseCase
}
