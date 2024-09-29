import React from 'react';
import style from "./Layout.module.css";
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-center mx-5 items-center">
      <div className=''>
      <Navbar />

      </div>
      <div className="pt-8 mt-8 container">
        <Outlet />
      </div>
      <div className='w-full'>

      <Footer />
      </div>
    </div>
  );
}
