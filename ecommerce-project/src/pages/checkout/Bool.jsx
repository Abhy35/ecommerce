// import { useState } from "react";

export function Bool({bool,i, setvalue}){

  if(bool=='true'){
    return (
      <input className="input-update-text" type="number" 
      defaultValue={i.quantity}
      onChange={(event)=>{
        console.log(event.target.value);
        setvalue(Number(event.target.value));
      }} />
    )
  }
  else{
      return (
        <>
          Quantity: <span className="quantity-label">{i.quantity}</span>
        </>
      )
  }
}