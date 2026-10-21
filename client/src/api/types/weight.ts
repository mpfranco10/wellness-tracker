export type WeightEntry = {
  id: string;
  userId: string;
  weightKg: string;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateWeightInput = {
  weightKg: number;
  recordedAt?: string;
};
