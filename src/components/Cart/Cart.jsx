import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { CartContext } from '../../Context/CartContext'
import Product from './../Product/Product';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {
  let {numcart , setnumcart} = useContext(CartContext)

  let {GetCart , UpdateCart , DeleteCart} = useContext(CartContext)
  const [cart, setcart] = useState(null)


  async function getcart(){
   let res = await GetCart()
   
   if(res.data.status == "success")
    {
      setcart(res.data.data)
  }
  }

  async function update(id,count){
   let res = await UpdateCart(id,count)
   setcart(res.data.data)

   if(count == 0)
   {
    deleteitem(id)
   }
   
  
  }
  async function deleteitem(id){
   let res = await DeleteCart(id)
   console.log(res);
   setnumcart  (numcart - 1)

   setcart(res.data.data)
   toast.success("removed successfuly")

  
  }

   
  
  useEffect(() => {
   getcart()
  }, [])
  
  return (
    <>
    {cart?.products?.length > 0? <> <h3 className='font-bold text-3xl text-green-600 text-center m-5'>total price : {cart?.totalCartPrice}</h3>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cart?.products?.map((Product)=>  <tr key={Product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={Product?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {Product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{update(Product.product.id,Product.count - 1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span className='text-black text-xl'>
                {Product?.count}
              </span>
            </div>
            <button onClick={()=>{update(Product.product.id,Product.count + 1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${Product?.price}
        </td>
        <td className="px-6 py-4 cursor-pointer">
          <span onClick={()=>{deleteitem(Product.product.id)}}>Remove</span>
        </td>
      </tr>)}
     
    
    </tbody>
  </table>
    <Link to={"/checkout"}>
  <button  className='btn p-3 mt-3 bg-green-500 text-center w-full'>check out</button>
    </Link>
</div></>: <h1 className='font-bold text-3xl text-center mt-36 text-green-600 capitalize'>there is no item in cart</h1> }
   


    </>
  )
}
