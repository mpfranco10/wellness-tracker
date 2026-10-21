import type { CreateWeightInput, WeightEntry } from "../types/weight";

export const DEV_USER_ID = "006ba32b-dc6c-4ad1-aa97-2a5ea8893a55";

export async function getWeights(): Promise<WeightEntry[]> {
  const response = await fetch(`/api/weights?userId=${DEV_USER_ID}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weights");
  }

  return response.json();
}

export async function createWeight(
  input: CreateWeightInput,
): Promise<WeightEntry> {
  const response = await fetch("/api/weights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: DEV_USER_ID,
      ...input,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create weight entry");
  }

  return response.json();
}
