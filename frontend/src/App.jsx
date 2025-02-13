import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UseLogout';
import CaptainLogout from './pages/CaptainLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';



const App = () => {
  return (
    <div>
      {/* routes for different pages */}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />

        <Route path="/user-logout" element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />

        <Route path="/captain-logout" element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />

<Route path='/riding' element={<Riding />} />

<Route path='/Captain-riding' element={<CaptainRiding />} />
      </Routes>


    </div>
  )
}

export default App
