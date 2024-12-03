import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userName, setUserName] = useState(''); // Store user's name

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true); // Mark user as logged in
    setUserName(name); // Store user's name
  };

  return (
    <Router>
      <div className="App" style={{ marginTop: '50px', textAlign: 'center' }}>
        <Routes>
          {/* Profile route */}
          <Route 
            path="/profile" 
            element={isLoggedIn ? <Profile userName={userName} /> : <Navigate to="/login" />} 
          />

          {/* Login route */}
          <Route 
            path="/login" 
            element={
              <div>
                <Login onSuccess={handleLoginSuccess} />
              </div>
            } 
          />

          {/* Register route */}
          <Route 
            path="/" 
            element={
              <div>
                <Register />
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
