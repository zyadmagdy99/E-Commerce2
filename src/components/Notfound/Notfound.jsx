import React, { useEffect, useState } from 'react'
import style from "./Notfound.module.css"
import image from "../../../finalProject assets-20240731T220238Z-001/finalProject assets/error.svg"

export default function Notfound() {
  return (
    <div className='w-96 m-auto mt-32' >
      <img src={image} className='w-full' alt="" />
    </div>
  )
}
