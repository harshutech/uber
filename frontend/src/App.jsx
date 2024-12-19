import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/home";
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';



const App = () => {
  return (
    <div>
      {/* routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App