import { useState } from "react";

export default function DietGenerationForm({ patient, setDietPlan }) {
  const [dietType, setDietType] = useState("Pitta balance");
  const [loading, setLoading] = useState(false);

  const generateDiet = () => {
    setLoading(true);
    setTimeout(() => {
      // Mock diet plan
      const plan = {
        Monday: {
          Morning: "Herbal Tea + Fruits 🍵",
          Afternoon: "Veg Khichdi 🌾",
          Evening: "Soup 🥣",
          Night: "Warm Milk + Nuts 🥛"
        },
        Tuesday: {
          Morning: "Idli + Coconut Chutney",
          Afternoon: "Veg Curry + Rice 🍚",
          Evening: "Fruit Salad 🍎",
          Night: "Golden Milk + Dates"
        },
        // ... rest of the week
      };
      setDietPlan(plan);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md space-y-3">
      <h2 className="font-semibold text-green-700">Step 2: Generate Diet for {patient.name}</h2>
      <select
        className="border p-2 rounded w-full"
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
      >
        <option>Weight Loss</option>
        <option>Pitta balance</option>
        <option>Kapha balance</option>
      </select>
      <button
        onClick={generateDiet}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "🌱 Generating..." : "Generate Diet Plan"}
      </button>
    </div>
  );
}
