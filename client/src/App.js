import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Username from './components/auth/Username';
import Password from './components/auth/Password';
import Recovery from './components/auth/Recovery';
import Reset from './components/auth/Reset';
import Profile from './components/auth/Profile';

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/username' element={<Username />} />
          <Route path='/password' element={<Password />} />
          <Route path='/recovery' element={<Recovery />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
export default App;
