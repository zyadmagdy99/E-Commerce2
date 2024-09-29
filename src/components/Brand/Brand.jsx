import React, { useContext, useEffect, useState } from 'react'
import { BrandContext } from '../../Context/BrandsContext'


export default function Brand() {
  let {handlebrands} = useContext(BrandContext)

 const [br, setbr] = useState([])
 async function getbrand(){
    let res = await handlebrands()
    setbr(res.data.data)
  }
  console.log(br);
  
 useEffect(() => {
   getbrand()
  
 }, [])
  
 
  return (
    <>
    <div className='flex flex-wrap'>{br?.map((ele)=><div className=''>
      <div><img src={ele.image} alt="" /></div>
    </div>)}
    </div>
    </>
  )
}
