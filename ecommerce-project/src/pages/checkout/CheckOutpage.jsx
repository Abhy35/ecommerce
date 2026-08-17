import axios from 'axios'
import './CheckoutPage.css';

import { CheckoutHeader } from './CheckoutHeader';

import { useEffect, useState } from 'react';

import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';


export function CheckoutPage({cart, loadcart}){
  let deliveryOptionArray = useState([]);
  let deliveryOption = deliveryOptionArray[0];
  let setdeliveryoption = deliveryOptionArray[1];

  let paymentarray = useState([]);
  let payment = paymentarray[0];
  let setpayment = paymentarray[1];

  useEffect(()=>{
    const FetchCheckoutData = async () => {
      let response = await axios.get('api/delivery-options?expand=estimatedDeliveryTime');
      setdeliveryoption(response.data);
    }
    FetchCheckoutData()
  }, [])

  useEffect(()=>{
    const FetchPaymentData = async ()=>{
      let response = await axios.get('api/payment-summary');
      setpayment(response.data);
    }
    FetchPaymentData()
  }, [cart])

  return(
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOption={deliveryOption} loadcart={loadcart} />

          <PaymentSummary payment={payment} loadcart={loadcart} />
        </div>
      </div>
    </>
  )
}