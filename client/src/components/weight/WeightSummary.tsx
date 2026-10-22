import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWeights } from "../../api/hooks/useWeights";

export const WeightSummary = () => {
  const { data: weights, isLoading, isError } = useWeights();

  if (isLoading) {
    return <p>Loading summary...</p>;
  }

  if (isError || !weights?.length) {
    return null;
  }

  const currentWeight = Number(weights[0].weightKg);
  const startingWeight = Number(weights.at(-1)?.weightKg);
  const weightChange = currentWeight - startingWeight;

  return (
    <Card className="bg-secondary/55">
      <CardHeader>
        <CardDescription>Current Weight</CardDescription>
        <CardTitle className="text-4xl">
          {currentWeight.toFixed(1)} kg
        </CardTitle>
      </CardHeader>

      <CardContent>
        {weights.length > 1 && (
          <p className="text-sm text-muted-foreground">
            {weightChange > 0 ? "+" : ""}
            {weightChange.toFixed(1)} kg overall
          </p>
        )}
      </CardContent>
    </Card>
  );
};
