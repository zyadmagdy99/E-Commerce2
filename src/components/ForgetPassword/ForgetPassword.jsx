import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { countercontext } from '../../Context/CounterContext'







export default function ForgetPassword() {
 
  let navigate = useNavigate()
  const [errors, seterrors] = useState("")
  const [Loading, setLoading] = useState(false)
  let {setuserLogin} = useContext(countercontext)

 function handleForget (values)
 {
   setLoading(true)
  axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
  .then((res)=>{
    setLoading(false)
    if(res.data.statusMsg == "success")
      {
      
        navigate("/verfiy")
      }    
    
  })
  .catch((res)=>{
    console.log(res.response.data.message);
    seterrors(res.response.data.message)
    setLoading(false)

    
  })
 }

  // function validation (value){
  //   let errors = {}
  //   if(!value.name){
  //     errors.name = "name is empty"
  //     return errors
  //   }
  // }

  let validationSchema = yup.object().shape({
   
    email : yup.string().email("email is not valid").required("email is required"),

  })
  
  let Formik = useFormik({


    initialValues:{

    email:"",
   
    },
    validationSchema,
    onSubmit:handleForget
  }

)
  return (
    <>
    
    
<div>
  <h1 className='text-2xl font-bold flex justify-center'> Forgit Password</h1>
  {errors?<div className='w-[100] flex justify-center text-red-600 font-bold text-2xl '>{errors}</div>:null}

  
<form onSubmit={Formik.handleSubmit} className="max-w-md mx-auto mt-24">

<div className="relative z-0 w-full mb-5 group">
      <input type="text" value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>
  {Formik.errors.email && Formik.touched.email?<div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:text-red-400" role="alert">
  <span className="font-medium">{Formik.errors.email}</span>
</div>:""}
 





    <div className='flex justify-around items-center'>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {Loading?'loading...':"Submit"}
  </button>


    </div>
</form>
</div>
    </>
  )
}
