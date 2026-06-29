import { useEffect, useRef, useState } from "react";

type FoodSearchResult = {
  fdcId: number;
  description: string;
  dataType?: string;
  brandOwner?: string | null;
  foodNutrients?: any[];
};

type SearchBarProps = {
  auth0Sub: string;
  onFoodAdded?: (food: any) => void;
};

export default function SearchBar({ auth0Sub, onFoodAdded }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodSearchResult[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodSearchResult | null>(
    null,
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    debounceRef.current = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/foods/search?query=${encodeURIComponent(query)}`,
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Search failed: ${response.status} ${text}`);
        }

        const data = await response.json();
        setResults(data.foods ?? []);
      } catch (err: any) {
        setError(err.message || "Search failed");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleAddFood = async () => {
    if (!selectedFood) return;

    try {
      setAdding(true);
      setError(null);
      console.log("POST body", {
        auth0_id: auth0Sub,
        food_fdc_id: selectedFood.fdcId,
        food_description: selectedFood.description,
        quantity,
        nutrients: selectedFood.foodNutrients ?? [],
      });

      const response = await fetch("/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth0_id: auth0Sub,
          food_fdc_id: selectedFood.fdcId,
          food_description: selectedFood.description,
          quantity,
          nutrients: selectedFood.foodNutrients ?? [],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to add food: ${response.status} ${text}`);
      }

      const savedFood = await response.json();
      onFoodAdded?.(savedFood);

      setSelectedFood(null);
      setQuery("");
      setResults([]);
      setQuantity(1);
    } catch (err: any) {
      setError(err.message || "Failed to add food");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="w-full max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Search food</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for cheddar cheese..."
          className="w-full rounded border px-3 py-2"
        />
      </div>

      {loading && <p className="text-sm text-gray-500">Searching...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {results.length > 0 && !selectedFood && (
        <ul className="border rounded divide-y">
          {results.map((food) => (
            <li key={food.fdcId}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                onClick={() => setSelectedFood(food)}
              >
                <div className="font-medium">{food.description}</div>
                <div className="text-xs text-gray-500">
                  {food.brandOwner ?? food.dataType ?? "Food"}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedFood && (
        <div className="border rounded p-4 space-y-3">
          <div>
            <div className="font-semibold">{selectedFood.description}</div>
            <div className="text-sm text-gray-500">
              FDC ID: {selectedFood.fdcId}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded border px-3 py-2"
              min={0}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddFood}
              disabled={adding}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add food"}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFood(null)}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
