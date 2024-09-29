import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export let CartContext = createContext();



export default function CartContextProvider(props) {
    
    let [id, setid] = useState(0)
    const [numcart, setnumcart] = useState(0)
  let headers = {token : localStorage.getItem("token")}
    function AddToCart(productId){
       return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId
        },{ headers 
        }
        ).then((res)=>res)
        .catch((res)=>res)
    }
    

    function GetCart(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
     .then((res)=>{
      
      setnumcart(res.data.numOfCartItems)
      setid(res.data.data._id)
      return res
      
     })     .catch((err)=>err)
    }
    useEffect(() => {
      GetCart()
    
    }, [])
    
    
    function UpdateCart(id,count){
     return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count : count
     },
      {headers})
     .then((res)=>res)
     .catch((err)=>err)
    }
    function DeleteCart(id){
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {headers})
     .then((res)=>res)
     .catch((err)=>err)
    }
    function check(id,url,adress){
     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,{shippingAddress:adress},
      {headers})
     .then((res)=>{
      console.log(res)
      return res
      
     })
     .catch((err)=>err)
    }
    

  return (
    <CartContext.Provider value={{DeleteCart , UpdateCart , AddToCart , GetCart , check ,id ,numcart, setnumcart}}>
        {props.children}
    </CartContext.Provider>
  )
}
