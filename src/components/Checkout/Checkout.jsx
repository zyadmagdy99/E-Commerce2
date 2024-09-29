import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'







export default function Checkout() {
  let { id } = useContext (CartContext)
 
  
  let {check } = useContext (CartContext)
  
  
  
  
  let Formik = useFormik({
    
    
    initialValues:{
      
      details:"",
      phone:"",
      city:"",
      
    },
    onSubmit:()=>{handleCheckout(id,"http://localhost:5173")}
  }
  
)
async function handleCheckout (id,url)
{
  let {data} = await check(id,url,Formik.values)
  
  window.location.href=data.session.url
}
  return (
    <>
    
    
<div>
  <h1 className='text-2xl font-bold flex justify-center'> check out</h1>

  
<form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto mt-24">

<div className="relative z-0 w-full mb-5 group">
      <input type="text" value={Formik.values.details} onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="details" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your details</label>
  </div>
 
 


<div className="relative z-0 w-full mb-5 group">
      <input type="tel" value={Formik.values.phone} onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
  </div>
<div className="relative z-0 w-full mb-5 group">
      <input type="text" value={Formik.values.city} onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="city" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
  </div>
  



    <div className='flex justify-around items-center'>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    check out
  </button>
  

    </div>
   
</form>
</div>
    </>
  )
}
