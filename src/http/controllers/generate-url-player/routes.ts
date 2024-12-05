import { FastifyInstance } from "fastify";

import { generateSignedUrl } from "./signed-url";
import { validateSignedUrl } from "./validate-signed-url";
import { invalidateToken } from "./invalidate-url";

export async function generateUrlPlayerRoutes(app: FastifyInstance) {
  app.post("/generate/url", generateSignedUrl);
  app.post("/validate/url", validateSignedUrl);
  app.post("/invalidate/url", invalidateToken);
}
