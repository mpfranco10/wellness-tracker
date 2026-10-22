import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateWeight } from "../../api/hooks/useWeights";
import { getCurrentLocalDateTime } from "../../utils/date";

const weightFormSchema = z.object({
  weightKg: z.coerce.number().positive("Weight must be greater than 0"),
  recordedAt: z.string().min(1, "Date and time are required"),
});

type WeightFormInput = z.input<typeof weightFormSchema>;
type WeightFormData = z.output<typeof weightFormSchema>;

export const WeightForm = () => {
  const { mutate: createWeight, isPending, isError } = useCreateWeight();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WeightFormInput, unknown, WeightFormData>({
    resolver: zodResolver(weightFormSchema),
    defaultValues: {
      weightKg: undefined,
      recordedAt: getCurrentLocalDateTime(),
    },
  });

  const onSubmit = (data: WeightFormData) => {
    createWeight(
      {
        weightKg: data.weightKg,
        recordedAt: new Date(data.recordedAt).toISOString(),
      },
      {
        onSuccess: () => {
          reset({
            weightKg: undefined,
            recordedAt: getCurrentLocalDateTime(),
          });
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Weight</CardTitle>
        <CardDescription>
          Record your weight and track your progress over time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="weightKg">Weight (kg)</Label>

            <Input
              id="weightKg"
              type="number"
              step="0.1"
              placeholder="74.0"
              {...register("weightKg")}
            />

            {errors.weightKg && (
              <p className="text-sm text-destructive">
                {errors.weightKg.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="recordedAt">Date and time</Label>

            <Input
              id="recordedAt"
              type="datetime-local"
              {...register("recordedAt")}
            />

            {errors.recordedAt && (
              <p className="text-sm text-destructive">
                {errors.recordedAt.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : "Save Weight"}
          </Button>

          {isError && (
            <p className="text-sm text-destructive">
              Could not save weight. Please try again.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
