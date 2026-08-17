import { Header } from "./Header"
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsGrid } from "../pages/home/ProductsGrid";

export function Search({cart, loadcart}){
  const {name} = useParams();
  // console.log(name);

  let productsarray = useState([]);
  let products = productsarray[0];
  let setproducts = productsarray[1];  

  useEffect(()=>{
    const getHomeData = async()=>{
        const response = await axios.get(`http://localhost:3000/api/products?search=${name}`)
        setproducts(response.data);
    }
    getHomeData();
  }, []);
  return (
    <>
    <Header cart={cart} />
    <div className="home-page">
      <ProductsGrid products={products} loadcart={loadcart}/>
    </div>
    </>
  )
}