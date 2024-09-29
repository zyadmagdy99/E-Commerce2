import React, { useEffect, useState } from 'react'
import style from "./Home.module.css"
import HomeProducts from '../HomeProducts/HomeProducts'
import CategoriesDetails from '../CategoriesDetails/CategoriesDetails';
import axios from 'axios';
import MainSlider from './../MainSlider/MainSlider';


export default function Home() {

 
  return (
    

    <div className='mt-4 flex flex-col'>
      <MainSlider/>
      <CategoriesDetails/>
      <HomeProducts/>
    </div>
  )
}
