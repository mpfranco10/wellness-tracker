import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteWeight, useWeights } from "../../api/hooks/useWeights";

export const WeightHistory = () => {
  const { data: weights, isLoading, isError } = useWeights();
  const { mutate: deleteWeight, isPending: isDeleting } = useDeleteWeight();

  if (isLoading) {
    return <p>Loading weights...</p>;
  }

  if (isError) {
    return <p>Could not load weights.</p>;
  }

  if (!weights?.length) {
    return <p>No weight entries yet.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight History</CardTitle>
        <CardDescription>Your recently recorded weights.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="divide-y">
          {weights.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium">
                  {new Date(entry.recordedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(entry.recordedAt).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">
                  {Number(entry.weightKg).toFixed(1)} kg
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isDeleting}
                  onClick={() => deleteWeight(entry.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
