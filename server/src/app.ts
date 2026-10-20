import Fastify from "fastify";
import { prisma } from "./lib/prisma.js";

const app = Fastify({
  logger: true,
});

app.get("/api/health", async () => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
  };
});

app.post("/api/weights", async (request, reply) => {
  const body = request.body as {
    userId: string;
    weightKg: number;
    recordedAt?: string;
  };

  const weightEntry = await prisma.weightEntry.create({
    data: {
      userId: body.userId,
      weightKg: body.weightKg,
      recordedAt: body.recordedAt ? new Date(body.recordedAt) : new Date(),
    },
  });

  return reply.status(201).send(weightEntry);
});

const start = async () => {
  try {
    await app.listen({
      port: 3000,
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
