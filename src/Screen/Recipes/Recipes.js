import Navbar from '../../Components/Navbar/Navbar';

function Recipes() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-20">
            Delicious Recipes
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recipe cards will go here */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-emerald-400 to-teal-500"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Chickpea Curry</h3>
                <p className="text-gray-600 mb-4">Creamy, spicy, and packed with protein.</p>
                <div className="flex items-center text-emerald-600 font-semibold">
                  <span>25 min</span>
                  <span className="ml-6">4 servings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Recipes;
