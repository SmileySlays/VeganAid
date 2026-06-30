import Navbar from "../../Components/Navbar/Navbar.js";
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

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

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
    const loadSavedFoods = async () => {
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
    };

    loadSavedFoods();
  }, [auth0Sub]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-emerald-50 py-12">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-emerald-700 mb-2">
              Nutrition Tracker
            </h1>
            <p className="text-gray-600">
              Track your daily calories, macros, and micronutrients with
              precision.
            </p>
          </div>

          {/* Search card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            {isAuthenticated && auth0Sub ? (
              <SearchBar
                auth0Sub={auth0Sub}
                onFoodAdded={(savedFood: SavedFood) => {
                  setSavedFoods((prev) => [
                    ...prev,
                    {
                      ...savedFood,
                      food_description: savedFood.food_description,
                      calories: Number(savedFood.calories),
                      nutrients: savedFood.nutrients ?? [],
                    },
                  ]);
                }}
              />
            ) : (
              <p className="text-sm text-gray-500">
                Sign in to search and save foods.
              </p>
            )}
          </div>

          {/* Reports card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Nutrition Reports
                </h2>
                <p className="text-gray-600 text-sm">
                  Generate a summary or view saved foods.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setReportType("summary")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
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
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
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
                onUpdateQuantity={
                  reportType === "foods"
                    ? (id, newQuantity) => {
                        fetch(`/api/foods/${id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ quantity: newQuantity }),
                        }).then((res) => {
                          if (res.ok) {
                            setSavedFoods((prev) =>
                              prev.map((f) =>
                                f.id === id ? { ...f, quantity: newQuantity } : f
                              )
                            );
                          }
                        });
                      }
                    : undefined
                }
                onDelete={
                  reportType === "foods"
                    ? (id) => {
                        fetch(`/api/foods/${id}`, { method: "DELETE" }).then(
                          (res) => {
                            if (res.ok) {
                              setSavedFoods((prev) =>
                                prev.filter((f) => f.id !== id)
                              );
                            }
                          }
                        );
                      }
                    : undefined
                }
              />
          </div>
        </div>
      </main>
    </>
  );
}

export default Nutrition;
