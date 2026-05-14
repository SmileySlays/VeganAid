import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Screen/Home/Home';
import Recipes from './Screen/Recipes/Recipes';
import Nutrition from './Screen/Nutrition/Nutrition';
import Journal from './Screen/Journal/Journal';
import LoginButton from './Components/LoginButton/LoginButton.tsx';
import LogoutButton from './Components/LogoutButton/LogoutButton.tsx';
import Profile from './Screen/Profile/Profile.tsx';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Login from './Screen/Login/Login.tsx';

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-state">
          <div className="error-title">Oops!</div>
          <div className="error-message">Something went wrong</div>
          <div className="error-sub-message">{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} />
      <Route path="/recipes" element={isAuthenticated ? <Recipes /> : <Navigate to="/" replace />} />
      <Route path="/nutrition" element={isAuthenticated ? <Nutrition /> : <Navigate to="/" replace />} />
      <Route path="/journal" element={isAuthenticated ? <Journal /> : <Navigate to="/" replace />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} />
    </Routes>
    </div>
  );

  // return (
    
  //     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
  //       
        
  //       <Routes>
  //         {/* <Route path="/" element={<Login /> } /> */}
  //         <Route path="/home" element={<Home />} />
  //         <Route path="/recipes" element={<Recipes />} />
  //         <Route path="/nutrition" element={<Nutrition />} />
  //         <Route path="/journal" element={<Journal />} />
  //       </Routes>
  //     </div>
    
  // );
}

export default App;
