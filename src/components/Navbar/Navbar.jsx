import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import log from "../../../finalProject assets-20240731T220238Z-001/finalProject assets/freshcart-logo.svg";
import { countercontext } from '../../Context/CounterContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  let navigate = useNavigate();
  
  const { numcart } = useContext(CartContext);
  const { userLogin, setuserLogin } = useContext(countercontext);
  
  const [links, setLinks] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  function LogOut() {
    localStorage.removeItem("token");
    setuserLogin(null);
    navigate("/login");
  }

  const toggleMenu = () => {
    setLinks(!links);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setLinks(false); 
        setIsMobile(false);
      } else {
        setIsMobile(true); 
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='fixed top-0 right-0 left-0 z-50'>
      <nav className="bg-gray-300 border-gray-200 text-emerald-900">
        <div className="flex justify-center flex-col md:justify-between md:flex-row md:items-center mx-auto max-lg-screen-md p-4">
          
          <div className='flex flex-col md:flex-row md:items-center gap-6 items-start w-full'>
            <div className='flex justify-between w-full md:w-auto'>
              <Link to="/">
                <img src={log} className="h-8" alt="Flowbite Logo" />
              </Link>

              {isMobile && (
                <button
                  className='text-emerald-900 md:hidden'
                  onClick={toggleMenu}
                >
                  <i className={`fa ${links ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
              )}
            </div>

            <div className={`flex gap-4 flex-col md:flex-row ${links || !isMobile ? 'block' : 'hidden'} w-full md:w-auto`}>
              {userLogin && (
                <>
                  <Link onClick={toggleMenu} to="/">Home</Link>
                  <Link className='relative' onClick={toggleMenu} to="cart">Cart
                    <div className='absolute top-[6px] ms-7 bg-emerald-600 size-5 rounded-full text-white flex items-center justify-center'>{numcart}</div>
                  </Link>
                  <Link className='md:ms-2' to="product" onClick={toggleMenu}>Products</Link>
                  <Link to="categories" onClick={toggleMenu}>Categories</Link>
                  <Link to="brands" onClick={toggleMenu}>Brands</Link>
                </>
              )}
            </div>
          </div>
                
          <div className={`flex mt-4 md:mt-0 md:items-center space-x-6 rtl:space-x-reverse justify-between items-center md:flex-row ${links || !isMobile ? 'block' : 'hidden'}`}>
            <div className='logos flex  gap-3'>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>

            <div className='sign flex gap-4 flex-col items-start mt-2 md:flex-row'>
              {userLogin
                ? <Link className='bg-green-500 text-white p-2 rounded-3xl m-auto md:m-0' onClick={LogOut} to="login">Signout</Link>
                : (
                  <div className='flex gap-2 '>
                    <Link className='white bg-green-500  p-2 rounded-3xl m-auto md:m-0' to="login">Login</Link>
                    <Link className='white bg-green-500  p-2 rounded-3xl m-auto md:m-0' to="register">Register</Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
