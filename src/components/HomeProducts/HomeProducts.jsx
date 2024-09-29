import React, { useContext, useEffect, useState } from 'react'
import style from "./HomeProducts.module.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useProduct from '../../hooks/useProduct';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




export default function HomeProducts() {
  let {numcart , setnumcart} = useContext(CartContext)


  // const [Products, setProduct] = useState([])
 
  // function GetProduct(){
  //   axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //   .then((res)=>{
  //     setProduct(res.data.data)
      
  //   })
  //   .catch((res)=>{})
  // }
  // useEffect(() => {
  //   GetProduct()
  //   }, [])
 const [loading, setloading] = useState(false)
 const [proid, setproid] = useState(null)

  let {AddToCart} = useContext(CartContext)

  async function addcart(id){
    setloading(true)
    setproid(id)
  let res = await AddToCart(id)
    console.log(res.data.status);
    
    if (res.data.status == "success"){
      setnumcart  (numcart + 1)
      toast.success(res.data.status);
      setloading(false)
    }else{
      setloading(false)
   
        toast.error(res.data.status);
    }
  }
 
  let {data,error,isError,isLoading} = useProduct()
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
        <div key={product.id} className='w-1/2 md:w-1/3 lg:w-1/6 product'>
        <Link to={`productdetails/${product.id}/${product.category.name}`}>
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
        
          <div onClick={()=>{addcart(product.id)}} className='btn bg-green-700 h-[30px]  text-white mx-auto px-6 cursor-pointer text-center	'>
          {loading && proid == product.id ?"loading..." :"Add to cart" }
          </div>
        </div>

      ))}


      </div>
    
    
    </>)
}
