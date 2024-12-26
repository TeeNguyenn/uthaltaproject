import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const [isLogined, setIsLogined] = useState(false);
  const receiveLogin = (isLogined: boolean) => {
    setIsLogined(isLogined);
  }


  return (
    <div>
      {localStorage.getItem('token') ? <Dashboard /> :
        !isLogined ? <Login handleSuccess={receiveLogin} /> : <Dashboard />}
    </div>

  );
}
export default App;
