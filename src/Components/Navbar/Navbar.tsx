import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-emerald-900 to-teal-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white flex items-center space-x-2">
              <span>🌱</span>
              <span>VeganAid</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/recipes" className="text-white hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Recipes
            </Link>
            <Link to="/nutrition" className="text-white hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Nutrition
            </Link>
            <Link to="/journal" className="text-white hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Journal
            </Link>
            <Link to="/profile" className="text-white hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;