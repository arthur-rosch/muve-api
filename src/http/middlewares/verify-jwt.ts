import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      sub: string;
      role: "ADMIN" | "MEMBER";
    };
    request.user = { sub: decoded.sub, role: decoded.role };
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
