import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Screen/Home/Home';
import Recipes from './Screen/Recipes/Recipes';
import Nutrition from './Screen/Nutrition/Nutrition';
import Journal from './Screen/Journal/Journal';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
        </Auth0Provider>
      </div>
    
  );
}

export default App;
