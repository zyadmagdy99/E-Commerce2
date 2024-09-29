import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




export default function ProductDetails() {
  let {AddToCart} = useContext(CartContext)

  async function addcart(id){
    
  let res = await AddToCart(id)
    console.log(res.data.status);
    
    if (res.data.status == "success"){
      toast.success(res.data.status);
    }else{
   
        toast.error(res.data.status);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };

  let {id, name} = useParams()
  const [ProductDetails, setProductDetails] = useState(null)
  const [Related, setRelated] = useState([])

 function GetProductDetails (id){

  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  .then((res)=>{
    console.log(res.data.data);
    setProductDetails(res.data.data)
    
  })
  .catch((res)=>{})
 }

 function GetRelated(name){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  .then((res)=>{

    let Relate = res.data.data
   let Rel = Relate.filter((product)=>product.category.name == name)
    console.log(Rel);
    setRelated(Rel)
    
  })
  .catch((res)=>{})
 }

 useEffect(() => {
   GetProductDetails(id)
   GetRelated(name)
 
   
 }, [id,name])
 

  return (
    <>
    <div className="container ms-16 mt-12 mb-10 ">
      <div className="row flex gap-8">
          <div className="img w-1/4">
          <Slider {...settings}>
     {ProductDetails?.images?.map((src)=>  <img src={src} className='w-full' alt="" />)}
    </Slider>
          </div>
          <div className="details w-2/5 mx-auto flex flex-col  justify-around ">
          <div>

           <p className='font-bold text-xl text-center w-[10rem]'>{ProductDetails?.title}</p>
           <p className=' mt-10 w-[12rem] mb-5'>{ProductDetails?.description}</p>
          </div>
           <div>
            <div className='flex justify-between'>
            <p>{ProductDetails?.price} EGP </p>
            <p>{ProductDetails?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></p>
            </div>
         
           <div onClick={()=>{addcart(ProductDetails._id)}} className='btn bg-green-700 text-center cursor-pointer text-white mx-auto px-6 md:w-1/2 rounded-lg p-2 mt-4 w-full'>ADD TO CART</div>

           </div>

          </div>
      </div>
    </div>
    <div className='w-full flex flex-wrap justify-center items-center'>
    {Related.length > 0? Related.map((product)=>(
        <div key={product.id} className='w-1/2 md:w-1/6 product  '>
        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          <div className='flex flex-col p-4 '>
            <img src={product.imageCover} alt="" />
            <p className='text-sky-400 text-xs'>{product.category.name}</p>
            <p className='font-bold'>  {product.title.split(" ").slice(0,2).join(" ")}</p>
            <div className='flex justify-between'>
              <p>{product.price} EGP</p>
              <p><i className="fa-solid fa-star text-yellow-400"></i> {product.ratingsAverage}</p>
            </div>

          </div>
          
          <div className='btn bg-green-700 w-40 text-white mx-auto px-6'>ADD TO CART</div>
        </Link>
        </div>

      )):<span className="loader flex justify-center items-center w-screen  m-auto mt-[250px]"></span>}
    </div>

    </>
  )
}
