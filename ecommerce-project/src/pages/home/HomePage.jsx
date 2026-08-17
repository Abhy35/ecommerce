import { Header } from '../../components/Header.jsx';
// import {products} from '../../starting-code/data/products.js'
import './HomePage.css';

import axios from 'axios'
import { useState, useEffect } from 'react';

import { ProductsGrid } from './ProductsGrid.jsx';


export function HomePage({cart, loadcart}){
  let productsarray = useState([]);
  let products = productsarray[0];
  let setproducts = productsarray[1];


  useEffect(()=>{
    const getHomeData = async()=>{
        const response = await axios.get('/api/products')
        setproducts(response.data);
    }
    getHomeData();
  }, []);

  return(
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>ecommerce project</title>

      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadcart={loadcart}/>
      </div>
    </>
  );
}