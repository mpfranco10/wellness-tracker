import { WeightChart } from "@/components/weight/WeightChart";
import { WeightForm } from "@/components/weight/WeightForm";
import { WeightHistory } from "@/components/weight/WeightHistory";
import { WeightSummary } from "@/components/weight/WeightSummary";

function App() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Weight</h1>

          <p className="mt-1 text-muted-foreground">
            Track your progress over time.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <WeightSummary />
          <WeightForm />
        </div>

        <div className="mt-6">
          <WeightChart />
        </div>

        <div className="mt-6">
          <WeightHistory />
        </div>
      </div>
    </main>
  );
}

export default App;
