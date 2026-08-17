import {DeliveryOption}  from './DeliveryOption'
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from './DeliveyDate';

export function OrderSummary({cart, deliveryOption, loadcart}){
  return (
              <div className="order-summary">
              {
                cart.map((i)=>{
                  let selectDeliveryOption = deliveryOption.find((delivery)=>{
                    return delivery.id === i.deliveryOptionId;
                    
                  })
                  return (
                    <div key={i.productId} className="cart-item-container">
                      <DeliveryDate selectDeliveryOption={selectDeliveryOption} />
    
                      <div className="cart-item-details-grid">    
                        <CartItemDetails i={i} loadcart={loadcart} /> 
                        <DeliveryOption i={i} deliveryOption={deliveryOption} loadcart={loadcart} />
                      </div>
                    </div>
                  )
                })
              }
              </div>
  )
}