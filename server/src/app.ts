import Fastify from "fastify";
import { prisma } from "./lib/prisma.js";
import { weightRoutes } from "./routes/weights.js";

const app = Fastify({
  logger: true,
});

app.register(weightRoutes, {
  prefix: "/api",
});

app.get("/api/health", async () => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
  };
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
