import React from 'react';
import logo from '../assets/ecilnewlogo.jpg'

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 flex items-center bg-[#0a2f5a] text-white h-[50px]">
    <div className="h-[50px] w-[50px] flex-shrink-0">
      <img
        src={logo}
        alt="Electronics Corporation of India Limited logo"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex flex-col flex-grow text-center">
      <h1 className="font-bold text-[16px] leading-[20px]">
        Extraneous Manpower Management System
      </h1>
      <p className="font-semibold text-[14px] leading-[18px]">
        Electronics Corporation Of India Limited
      </p>
    </div>
  </header>
);

export default Header;





