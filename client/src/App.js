import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthorizeUser, ProtectedRoute } from './utils/authProtector';

import Home from './pages/Home';
import Register from './pages/Register';
import Username from './components/auth/Username';
import Password from './components/auth/Password';
import Recovery from './components/auth/Recovery';
import Reset from './components/auth/Reset';
import Profile from './components/auth/Profile';
import Calendar from './pages/Calendar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/username',
    element: <Username />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/password',
    element: (
      <ProtectedRoute>
        <Password />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
  {
    path: '/reset',
    element: <Reset />,
  },
  {
    path: '/calendar',
    element: (
      <AuthorizeUser>
        <Calendar />
      </AuthorizeUser>
    ),
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};
export default App;
