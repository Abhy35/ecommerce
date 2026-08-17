import axios from "axios"
import { formatMoney } from "../../utils/money"
import { useState } from "react";
import { Bool } from "./Bool.jsx";

export function CartItemDetails({i, loadcart}){
  const deleteCartItem = async ()=>{
  await axios.delete(`/api/cart-items/${i.productId}`);
  await loadcart();
  }

  let [bool, setbool] = useState('false');

  let [value, setvalue] = useState(i.quantity);
  const update = async ()=>{
    // await axios.post('/api/cart-items', {
    //   productId: i.product.id,
    //   quantity: value
    // })
    await axios.put(`/api/cart-items/${i.productId}`, {
      quantity: value
    });

    await loadcart();
  }
  


  return (
        <>
          <img className="product-image"
            src={i.product.image} />
          <div className="cart-item-details">
            <div className="product-name">
              {i.product.name}
            </div>
            <div className="product-price">
              ${formatMoney(i.product.priceCents)}
            </div>
            <div className="product-quantity">
              <Bool bool={bool} i={i} setvalue={setvalue} />
              <span className="update-quantity-link link-primary"
              onClick={()=>{
                if(bool=='false'){
                  setbool('true');
                }
                else{
                  setbool('false');
                  update();
                }
              }} >
                Update
              </span>
              <span className="delete-quantity-link link-primary"
              onClick={deleteCartItem} >
                Delete
              </span>
            </div>
          </div>
        </>
  )
}