import { FastifyInstance } from "fastify";
import { validateVerificationCode } from "./validation-code";
import { sendVerificationCode } from "./send-verification-code";

export async function emailVerificationRoutes(app: FastifyInstance) {
  app.post("/email-verification/send", sendVerificationCode);
  app.post("/email-verification/validate", validateVerificationCode);
}
