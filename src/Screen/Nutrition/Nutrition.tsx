import Navbar from "../../Components/Navbar/Navbar";
import { NutritionTable } from "../../Components/NutritionTable/NutritionTable";
import { nutrients } from "../../Data/nutrients";
import { useState } from "react";

function Nutrition() {
  const [dailyCalories, setDailyCalories] = useState(2000);

  console.log(nutrients.length);

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

          <div className="grid grid-cols-1 gap-3 mb-16">
            <NutritionTable
              as="table"
              items={nutrients}
            />
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-emerald-200 max-w-2xl mx-auto">
            <form className="max-w-md mx-auto ">
              <label
                id="search"
                className="block mb-2.5 text-sm font-medium text-heading sr-only "
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-body"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                  placeholder="Search"
                  required
                />
                <button
                  type="button"
                  className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
                >
                  Search
                </button>
              </div>
            </form>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Set Daily Goal
            </h2>
            <div className="flex items-end gap-4 mb-8">
              <label className="text-lg font-semibold text-gray-700 block mb-2">
                Daily Calories
              </label>
              <input
                type="range"
                min="1500"
                max="3000"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(e.target.value)}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300 accent-emerald-500"
              />
              <span className="text-2xl font-bold text-emerald-600 bg-emerald-100 px-4 py-2 rounded-xl">
                {dailyCalories}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-8 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1">
              Update Goals
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Nutrition;
