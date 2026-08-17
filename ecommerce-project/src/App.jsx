import {Routes, Route} from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckOutpage'
import { OrderPage } from './pages/orders/OrderPage'
import { TrackingPage } from './pages/TrackingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Search } from './components/Search'

function App() {
  let cartarray = useState([]);
  let cart = cartarray[0];
  let setcart = cartarray[1];

  const loadcart = async ()=>{
  let response = await axios.get('/api/cart-items?expand=product');
  setcart(response.data);
  }
  useEffect(()=>{
    loadcart();        

  }, [])

  window.axios = axios;

  return (
    <Routes>
      <Route path='/' element={<HomePage cart={cart} loadcart={loadcart} />}></Route>
      <Route path='/checkout' element={<CheckoutPage cart={cart} loadcart={loadcart} />}></Route>
      <Route path='/orders' element={<OrderPage cart={cart} loadcart={loadcart} />}></Route>
      <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart} />}></Route>
      <Route path='*' element={<NotFoundPage />}></Route>
      <Route path='/search/:name' element={<Search cart={cart} loadcart={loadcart} />}></Route>
    </Routes>
    
  )
}

export default App
