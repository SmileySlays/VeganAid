import Navbar from "../../Components/Navbar/Navbar";
import { NutritionTable } from "../../Components/NutritionTable/NutritionTable";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { nutrients } from "../../Data/nutrients";
import { useState } from "react";
import CalorieIntake from "../CalorieIntake/CalorieIntake";

function Nutrition() {
  const [dailyCalories, setDailyCalories] = useState(2000);
  const [search, setSearch] = useState("");

  console.log(search);
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
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-emerald-200 max-w-2xl mx-auto">
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
        <div className="mx-auto mt-12 w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-3 mt-12 mb-16">
            <SearchBar />
            {/* <CalorieIntake /> */}
            <NutritionTable as="table" items={nutrients} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Nutrition;
