import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Screen/Home/Home';
import Recipes from './Screen/Recipes/Recipes';
import Nutrition from './Screen/Nutrition/Nutrition';
import Journal from './Screen/Journal/Journal';

function App() {
  return (
    
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    
  );
}

export default App;
