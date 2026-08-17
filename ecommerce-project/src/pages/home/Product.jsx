import { useState } from "react";
import axios from "axios"
import { formatMoney } from "../../utils/money"

export function Product({i, loadcart}){
  let quantityArray = useState(1);
  let quantity = quantityArray[0];
  let setquantity = quantityArray[1];

  let [para, setpara] = useState(['',null]);

  return (
          <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                  data-testid='product-image'
                src={i.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
              {i.name}
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                  data-testid="product-rating-stars-img"
                src={`images/ratings/rating-${i.rating.stars * 10}.png`} />
              <div className="product-rating-count link-primary">
                {i.rating.count}
              </div>
            </div>

            <div className="product-price">
              ${formatMoney(i.priceCents)}
            </div>

            <div className="product-quantity-container">
              <select value={quantity}
              onChange={(event)=>{
                console.log(event.target.value);
                setquantity(Number(event.target.value));
              }} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src={para[1]} />
              {para[0]}
            </div>

            <button className="add-to-cart-button button-primary"
                data-testid='add-to-cart-test' 
            onClick={async ()=>{
              await axios.post('/api/cart-items', {
                productId: i.id,
                quantity: quantity
              })
              await loadcart();
              setpara(['Adeed',"images/icons/checkmark.png"]);
              setTimeout(()=>{
                setpara(['',null])
              },2000)
            }} >
              Add to Cart
            </button>
          </div>
  )
}