import { useState, type SubmitEvent } from "react";
import { useCreateWeight, useWeights } from "./api/hooks/useWeights";

function App() {
  const [weight, setWeight] = useState("");

  const { data: weights, isLoading, isError } = useWeights();

  const createWeight = useCreateWeight();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const weightKg = Number(weight);

    if (!weight || Number.isNaN(weightKg) || weightKg <= 0) {
      return;
    }

    createWeight.mutate(
      {
        weightKg,
      },
      {
        onSuccess: () => {
          setWeight("");
        },
      },
    );
  }

  if (isLoading) {
    return <p>Loading weights...</p>;
  }

  if (isError) {
    return <p>Could not load weights.</p>;
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="weight">Weight (kg)</label>

        <input
          id="weight"
          type="number"
          step="0.1"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          placeholder="74.0"
        />

        <button type="submit" disabled={createWeight.isPending}>
          {createWeight.isPending ? "Saving..." : "Save Weight"}
        </button>

        {createWeight.isError && <p>Could not save weight.</p>}
      </form>

      <h1>Weight History</h1>

      {weights?.length === 0 ? (
        <p>No weight entries yet.</p>
      ) : (
        weights?.map((entry) => (
          <div key={entry.id}>
            <strong>{entry.weightKg} kg</strong>
            <span> {new Date(entry.recordedAt).toLocaleString()}</span>
          </div>
        ))
      )}
    </main>
  );
}

export default App;
