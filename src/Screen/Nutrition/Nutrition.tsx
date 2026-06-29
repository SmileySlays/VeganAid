import Navbar from "../../Components/Navbar/Navbar.js";
// import { NutritionTable } from "../../Components/NutritionTable/NutritionTable";
import SearchBar from "../../Components/SearchBar/SearchBar.js";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ReportView } from "../../Components/Reports/ReportView.js";
import { DailyNutritionSummaryReport } from "../../Components/Reports/DailyNutritionSummaryReport.js";
import { SavedFoodsReport } from "../../Components/Reports/SavedFoodsReport.js";

type SavedFood = {
  id?: number;
  food_fdc_id?: number | null;
  food_description: string;
  quantity: number;
  nutrients: any[];
  created_at?: string;
};

function Nutrition() {
  const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);
  const [reportType, setReportType] = useState<"summary" | "foods">("summary");
  const { user, isLoading, isAuthenticated } = useAuth0();

  const auth0Sub = user?.sub;
  console.log("auth0Sub", auth0Sub);

  const generatedReport = useMemo(() => {
    if (reportType === "summary") {
      return new DailyNutritionSummaryReport(savedFoods).generate();
    }
    return new SavedFoodsReport(savedFoods).generate();
  }, [savedFoods, reportType]);

  const fetchSavedFoods = useCallback(async () => {
    if (!auth0Sub) return;

    try {
      const response = await fetch(
        `/api/foods?auth0_id=${encodeURIComponent(auth0Sub)}`,
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to load foods: ${response.status} ${text}`);
      }

      const data = await response.json();
      setSavedFoods(data.foods ?? []);
    } catch (error) {
      console.error("Failed to load saved foods", error);
    }
  }, [auth0Sub]);

  useEffect(() => {
    fetchSavedFoods();
  }, [fetchSavedFoods]);

  const handleDeleteFood = useCallback(
    async (id: number) => {
      try {
        const response = await fetch(`/api/foods/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to delete food: ${response.status} ${text}`);
        }

        setSavedFoods((prev) => prev.filter((f) => f.id !== id));
      } catch (error) {
        console.error("Failed to delete food", error);
      }
    },
    [],
  );

  const handleUpdateQuantity = useCallback(
    async (id: number, quantity: number) => {
      try {
        const response = await fetch(`/api/foods/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to update food: ${response.status} ${text}`);
        }

        const updated = await response.json();
        setSavedFoods((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, quantity: updated.quantity ?? quantity } : f,
          ),
        );
      } catch (error) {
        console.error("Failed to update food quantity", error);
      }
    },
    [],
  );

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-lime-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-lime-600 bg-clip-text text-transparent mb-6">
              Nutrition Tracker
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Track your daily calories, macros, and micronutrients with
              precision.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-emerald-200 max-w-2xl mx-auto">
            {isAuthenticated && auth0Sub ? (
              <SearchBar
                auth0Sub={auth0Sub}
                onFoodAdded={(savedFood: SavedFood) => {
                  setSavedFoods((prev) => [
                    ...prev,
                    {
                      ...savedFood,
                      food_description: savedFood.food_description,
                      quantity: Number(savedFood.quantity),
                      nutrients: savedFood.nutrients ?? [],
                    },
                  ]);
                }}
              />
            ) : (
              <div className="text-center text-gray-600">
                Sign in to search and save foods.
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-3xl px-6">
          <div className="grid grid-cols-1 gap-6 mt-12 mb-16">

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Nutrition Reports
                  </h2>
                  <p className="text-gray-600">
                    Generate a summary or view saved foods.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setReportType("summary")}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                      reportType === "summary"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Daily Summary
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType("foods")}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                      reportType === "foods"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Saved Foods
                  </button>
                </div>
              </div>

              <ReportView
                report={generatedReport}
                onDelete={reportType === "foods" ? handleDeleteFood : undefined}
                onUpdateQuantity={
                  reportType === "foods" ? handleUpdateQuantity : undefined
                }
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Nutrition;
