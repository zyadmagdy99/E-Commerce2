import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './components/Cart/Cart';
import Brand from './components/Brand/Brand';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Categories from './components/Categories/Categories';
import Product from './components/Product/Product';
import Notfound from './components/Notfound/Notfound';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import CounterContextProvider from './Context/CounterContext';
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerfiyPassword from './components/VerfiyPassword/VerfiyPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails';
import BrandContextProvider from './Context/BrandsContext';



let x = createBrowserRouter([{
  path:"",element:<Layout/>,children:[
    {index:true,element:<ProtectedRouter><Home/></ProtectedRouter>},
    {path:"cart",element:<ProtectedRouter><Cart/></ProtectedRouter>},
    {path:"brands",element:<ProtectedRouter><Brand/></ProtectedRouter>},
    {path:"checkout",element:<ProtectedRouter><Checkout/></ProtectedRouter>},
    {path:"productdetails/:id/:name",element:<ProtectedRouter><ProductDetails/></ProtectedRouter>},
  {path:"register",element:<Register/>},
   { path:"login",element:<Login/>},
   { path:"forget",element:<ForgetPassword/>},
   { path:"verfiy",element:<VerfiyPassword/>},
   { path:"reset",element:<ResetPassword/>},
    {path:"categories",element:<ProtectedRouter><CategoriesDetails/></ProtectedRouter>},
    {path:"product",element:<ProtectedRouter><Product/></ProtectedRouter>},
    {path:"*",element:<Notfound/>},
  ]
}])

function App() {

  let query =new QueryClient()


  return ( <>
 
    <CounterContextProvider>
      <QueryClientProvider client={query}>
      <CartContextProvider>
        <BrandContextProvider>

       <RouterProvider router={x}></RouterProvider>;
       <Toaster/>
        </BrandContextProvider>
      </CartContextProvider>
       <ReactQueryDevtools/>

       </QueryClientProvider>
    </CounterContextProvider>
   

    </>
  )
}

export default App
