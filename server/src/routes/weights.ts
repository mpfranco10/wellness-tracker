import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const createWeightSchema = z.object({
  userId: z.uuid(),
  weightKg: z.number().positive(),
  recordedAt: z.iso.datetime().optional(),
});

const getWeightsQuerySchema = z.object({
  userId: z.uuid(),
});

export function weightRoutes(app: FastifyInstance) {
  app.get("/weights", async (request, reply) => {
    const result = getWeightsQuerySchema.safeParse(request.query);

    if (!result.success) {
      return reply.status(400).send({
        error: "Invalid query parameters",
        details: result.error.issues,
      });
    }

    const { userId } = result.data;

    const weightEntries = await prisma.weightEntry.findMany({
      where: {
        userId,
      },
      orderBy: {
        recordedAt: "desc",
      },
    });

    return weightEntries;
  });

  app.post("/weights", async (request, reply) => {
    const result = createWeightSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({
        error: "Invalid request body",
        details: result.error.issues,
      });
    }
    const body = result.data;
    const weightEntry = await prisma.weightEntry.create({
      data: {
        userId: body.userId,
        weightKg: body.weightKg,
        recordedAt: body.recordedAt ? new Date(body.recordedAt) : new Date(),
      },
    });

    return reply.status(201).send(weightEntry);
  });

  const weightParamsSchema = z.object({
    id: z.uuid(),
  });

  app.delete("/weights/:id", async (request, reply) => {
    const result = weightParamsSchema.safeParse(request.params);

    if (!result.success) {
      return reply.status(400).send({
        error: "Invalid weight entry id",
        details: result.error.issues,
      });
    }

    const { id } = result.data;

    await prisma.weightEntry.delete({
      where: { id },
    });

    return reply.status(204).send();
  });
}
