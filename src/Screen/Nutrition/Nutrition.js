import Navbar from '../../Components/Navbar/Navbar';
import { useState } from 'react';

function Nutrition() {
  const [dailyCalories, setDailyCalories] = useState(2000);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-lime-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-lime-600 bg-clip-text text-transparent mb-6">
              Nutrition Tracker
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Track your daily calories, macros, and micronutrients with precision.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{dailyCalories}</div>
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Calories</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100">
              <div className="text-3xl font-bold text-teal-600 mb-2">120g</div>
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Protein</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full w-2/3"></div>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100">
              <div className="text-3xl font-bold text-lime-600 mb-2">250g</div>
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Carbs</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-lime-500 to-yellow-500 h-2 rounded-full w-5/6"></div>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">80g</div>
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Fat</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-emerald-200 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Set Daily Goal</h2>
            <div className="flex items-end gap-4 mb-8">
              <label className="text-lg font-semibold text-gray-700 block mb-2">Daily Calories</label>
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
