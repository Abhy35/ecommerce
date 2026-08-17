import {NavLink, Link} from 'react-router'
import './header.css'
import { useState } from 'react';
export function Header({cart}){
  let totalQuantity = 0;
  if(cart){
  cart.forEach((i)=>{
    totalQuantity = totalQuantity + i.quantity;
  })
  }

  let [name, setname] = useState(null);
  
  return (
    <>
        <div className="header">
          <div className="left-section">
            <NavLink to="/" className="header-link">
              <img className="logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoz44dK4b5ZF7tQT6TVjbQr58VF638y0HCC7MO_NYIVV33ZMIM4iNGgkjG&s=10" />
              <img className="mobile-logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoz44dK4b5ZF7tQT6TVjbQr58VF638y0HCC7MO_NYIVV33ZMIM4iNGgkjG&s=10" />
            </NavLink>
          </div>

          <div className="middle-section">
            <input className="search-bar" type="text" placeholder="Search" 
            onChange={(event)=>{
              setname(event.target.value)
            }} />
            <Link to={`/search/${name}`}>
            <button className="search-button">
              <img className="search-icon" src="images/icons/search-icon.png" />
            </button>
            </Link>
          </div>

          <div className="right-section">
            <NavLink className="orders-link header-link" to="/orders">

              <span className="orders-text">Orders</span>
            </NavLink>

            <NavLink className="cart-link header-link" to="/checkout">
              <img className="cart-icon" src="images/icons/cart-icon.png" />
              <div className="cart-quantity">{totalQuantity}</div>
              <div className="cart-text">Cart</div>
            </NavLink>
          </div>
        </div>
    </>
  )
}