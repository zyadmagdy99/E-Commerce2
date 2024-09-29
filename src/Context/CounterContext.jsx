import { createContext, useEffect, useState } from "react";

 export let countercontext = createContext();

  export default function CounterContextProvider(props){

    const [userLogin, setuserLogin] = useState(null)

    useEffect(()=>{
      if(localStorage.getItem("token"))
      {
        setuserLogin( localStorage.getItem("token"))
      }
    },[])

    return <>
    <countercontext.Provider value={{userLogin,setuserLogin}}>
        {props.children}
    </countercontext.Provider>
    
    </>
 }