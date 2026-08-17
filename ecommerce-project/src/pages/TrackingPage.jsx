import axios from 'axios';
import './TrackingPage.css'

import { Header } from '../components/Header'

import { useParams } from 'react-router'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function TrackingPage(){
  const {orderId, productId } = useParams();
  let trackOrderArray = useState([]);
  let trackorder = trackOrderArray[0];
  let settrackorder = trackOrderArray[1];

  let productsArray = useState([]);
  let products = productsArray[0];
  let setproducts = productsArray[1];
  useEffect(()=>{
    axios.get(`/api/orders/${orderId}?expand=products`)
    .then((response)=>{
      // console.log(response.data);
      settrackorder(response.data)
    })

    axios.get(`/api/products`)
    .then((response)=>{
      // console.log(response.data);
      setproducts(response.data);
    })

  }, [orderId])
  if(!trackorder){
    return null;
  }
  let name = '';
  let image = null;
  products.forEach((i)=>{
    if(i.id==productId){
      name = i.name;
      image = i.image;
    }
  })
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <title>Tracking</title>

      <Header />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on {dayjs(trackorder.orderTimeMs).format('MMMM D')}
          </div>

          <div className="product-info">
            {/* Black and Gray Athletic Cotton Socks - 6 Pairs? */}
            {name}
          </div>

          <div className="product-info">
            Quantity: 1
          </div>

          <img className="product-image" src={image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  )
}