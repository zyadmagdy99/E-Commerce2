import React, { useEffect, useState } from 'react'
import style from "./ProtectedRouter.module.css"
import { Navigate } from 'react-router-dom'


export default function ProtectedRouter(props) {
  

    if(localStorage.getItem("token")){

      return props.children

    }else{
      
      return <Navigate to={"/login"}/>
    }
  }