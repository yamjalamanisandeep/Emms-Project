


import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SubHeader from './features/SubHeader';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomeRoute = location.pathname.startsWith('/home');

  return (
    <div className="pt-[50px]">
      <Header />
      {isHomeRoute && <SubHeader />}
      <main className="min-h-screen bg-gray-100">{children}</main>
    </div>
  );
};

export default Layout;

  




