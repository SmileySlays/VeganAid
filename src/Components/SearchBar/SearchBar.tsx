import React, { useEffect, useState } from "react";

type Nutrient = {
  nutrientName: string;
  value: number;
};

type FoodItem = {
  foodNutrients: Nutrient[];
  description?: string;
  fdcId?: number;
  dataType?: string;
  brandOwner?: string | null;
};

type SearchResponse = {
  foods: FoodItem[];
};

type ResultRow = {
  food: FoodItem;
  nutrients: Nutrient[];
  calories: number;
};

const getCalories = (nutrients: Nutrient[]) => {
  const energy = nutrients.find(
    (n) =>
      n.nutrientName === "Energy" ||
      n.nutrientName === "Energy (Atwater General Factors)",
  );
  return energy?.value ?? 0;
};

const handleAddFood = async (food: FoodItem) => {
  try {
    const response = await fetch(`/api/foods/users/${userId}/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        food_description: food.description,
        food_fdc_id: food.fdcId,
        calories: getCalories(food.foodNutrients || []),
        nutrients: food.foodNutrients || [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Add failed: ${response.status}`);
    }

    const saved = await response.json();
    console.log("Saved food:", saved);
  } catch (error) {
    console.error("Add food error:", error);
  }
};

const SearchBar = () => {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setResults([]);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/foods/search_food?query=${encodeURIComponent(query)}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data: SearchResponse = await response.json();

        const nutritionArray: ResultRow[] = (data.foods || []).map((item) => {
          const nutrients = item.foodNutrients || [];
          return {
            food: item,
            nutrients,
            calories: getCalories(nutrients),
          };
        });

        setResults(nutritionArray);
        setError(null);
      } catch (err) {
        console.error(err);
        setResults([]);
        setError(err instanceof Error ? err.message : "Search failed");
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z"
            />
          </svg>
        </span>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <ul className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {results.map((result) => (
          <li
            key={
              result.food.fdcId ??
              result.food.description ??
              crypto.randomUUID()
            }
            className="px-4 py-3"
          >
            <p>Food Name: {result.food.description || "Unknown"}</p>
            <p>Calories: {result.calories}</p>

            <p>All Nutrients:</p>
            <ul className="list-disc space-y-1 pl-6">
              {result.nutrients.map((n) => (
                <li key={`${n.nutrientName}-${n.value}`}>
                  {n.nutrientName}: {n.value}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleAddFood(result.food)}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-400"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
