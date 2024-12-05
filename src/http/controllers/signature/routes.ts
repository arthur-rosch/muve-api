import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt";
import { getManySignatureByUserId } from "./get-many-by-user-id";
import { createStripeCheckout } from "./create-checkout-stripe";

export async function signatureRoutes(app: FastifyInstance) {
  app.get("/signature", { onRequest: [verifyJwt] }, getManySignatureByUserId);
  app.post("/create/checkout", createStripeCheckout);
}
