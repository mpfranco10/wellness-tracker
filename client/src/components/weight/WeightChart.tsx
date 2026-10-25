import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useWeights } from "@/api/hooks/useWeights";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const WeightChart = () => {
  const { data: weights, isLoading, isError } = useWeights();

  const chartData = useMemo(() => {
    if (!weights) {
      return [];
    }

    return [...weights].reverse().map((entry) => ({
      date: new Date(entry.recordedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      weight: Number(entry.weightKg),
    }));
  }, [weights]);

  if (isLoading) {
    return <p>Loading chart...</p>;
  }

  if (isError || chartData.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Trend</CardTitle>
        <CardDescription>
          See how your weight has changed over time.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="date" tickLine={false} axisLine={false} />

              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tickLine={false}
                axisLine={false}
                width={45}
              />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toFixed(1)} kg`,
                  "Weight",
                ]}
              />

              <Line
                type="monotone"
                dataKey="weight"
                stroke="var(--chart-1)"
                strokeWidth={3}
                dot={{
                  fill: "var(--chart-1)",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
