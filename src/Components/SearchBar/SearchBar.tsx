import React, { useEffect, useState } from "react";

type Nutrient = {
  nutrientName: string;
  value: number;
};

type FoodItem = {
  foodNutrients: Nutrient[];
  description?: string;
  fdcId?: number;
};

type SearchResponse = {
  foods: FoodItem[];
};

type ResultRow = {
  food: FoodItem;
  nutrients: Nutrient[];
  calories: number;
};

const SearchBar = () => {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<{ Food: string }>({ Food: "" });
  const [error, setError] = useState<string | null>(null);

  console.log(search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value);
    setSearch((prev) => ({ ...prev, [name]: value }));

    const query = value.trim();
    if (!query) {
      setResults([]);
      return;
    }

    fetch("/api/search_food", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const apiData = data as SearchResponse;
        console.log(apiData);

        const queryLower = query.toLowerCase();
        const filtered = apiData.foods.filter((food) => {
          const desc = food.description?.toLowerCase() || "";
          return desc.includes(queryLower) && !desc.includes("flavored");
        });

        const preferred = filtered.find((food) => {
          const desc = food.description?.toLowerCase() || "";
          return desc === queryLower || desc.startsWith(queryLower + " ");
        });

        const values = preferred ? [preferred] : filtered;

        const nutritionArray: ResultRow[] = values.map((item) => {
          const calories = item.foodNutrients.reduce((total, nutrient) => {
            if (nutrient.nutrientName === "Protein")
              return total + nutrient.value * 4;
            if (nutrient.nutrientName === "Carbohydrate, by difference")
              return total + nutrient.value * 4;
            if (nutrient.nutrientName === "Total lipid (fat)")
              return total + nutrient.value * 9;
            return total;
          }, 0);

          return {
            food: item,
            nutrients: item.foodNutrients,
            calories,
          };
        });

        setResults(nutritionArray);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
          name="Food"
          value={search.Food}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <ul className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
        {results &&
          results.map((result) => (
            <li
              key={result.food.fdcId ?? result.food.description}
              className="px-4 py-3"
            >
              <p>Food Name: {result.food.description || "Unknown"}</p>
              <p>Calories: {result.calories}</p>

              <p>All Nutrients:</p>
              <ul className="list-disc pl-6 space-y-1">
                {result.nutrients.map((n) => (
                  <li key={n.nutrientName}>
                    {n.nutrientName}: {n.value}
                  </li>
                ))}
              </ul>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Add
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;
