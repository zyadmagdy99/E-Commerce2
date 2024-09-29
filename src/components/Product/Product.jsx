import React, { useContext, useEffect, useState } from 'react'
import style from "./Product.module.css"
import { Link } from 'react-router-dom'
import useProduct from '../../hooks/useProduct'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'



export default function Product() {
  let {numcart , setnumcart} = useContext(CartContext)

  
  let {data,error,isError,isLoading} = useProduct()
  
  let {AddToCart} = useContext(CartContext)

  async function addcart(id){
   let res = await AddToCart(id)
   if (res.data.status == "success"){
    setnumcart  (numcart + 1)

    toast.success(res.data.status);

   }else{
     
     toast.error(res.data.status);
   }
  }
 if (isError)
 {
   return <h3> {error}</h3>
 }
 if(isLoading)
 {
   return <span className="loader flex justify-center items-center w-full ms-[650px] "></span>
 }
let res = data.data.data  
  
   return (<>
   
   <div className='flex flex-wrap mx-auto text-center w-[90%]'>
      {res?.map((product)=>(
        <div key={product._id} className='w-1/2 md:w-1/3 lg:w-1/6 product'>
        <Link to={`/productdetails/${product._id}/${product.category.name}`}>
          <div className='flex flex-col p-4 '>
            <img src={product.imageCover} alt="" />
            <p className='text-sky-400 text-xs'>{product.category.name}</p>
            <p className='font-bold'>  {product.title.split(" ").slice(0,2).join(" ")}</p>
            <div className='flex justify-between'>
              <p>{product.price} EGP</p>
              <p><i className="fa-solid fa-star text-yellow-400"></i> {product.ratingsAverage}</p>
            </div>

          </div>
          
        </Link>
          <div onClick={()=>{addcart(product.id)}} className='btn bg-green-700  text-white mx-auto px-6 cursor-pointer text-center	'>ADD TO CART</div>
        </div>

      ))}


      </div>
    
   
   </>)
}
