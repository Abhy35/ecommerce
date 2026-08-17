import './OrderPage.css';
import { Header } from '../../components/Header';
import {Link} from 'react-router';
import axios from 'axios'
import { useEffect, useState, Fragment } from 'react';
import { OrdersGrid } from './OrdersGrid';
// import dayjs from 'dayjs';
// import { formatMoney } from '../../utils/money';

export function OrderPage({cart, loadcart}){
  let ordersarray = useState([]);
  let orders = ordersarray[0];
  let setorders = ordersarray[1];

  useEffect(()=>{
    let getorder = async ()=>{
      const response = await axios.get('api/orders?expand=products');
      setorders(response.data);
    }
    getorder();
  },[])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
      <div className="page-title">Your Orders</div>

      <OrdersGrid orders={orders} loadcart={loadcart} />
      </div>
    </>
  )
}