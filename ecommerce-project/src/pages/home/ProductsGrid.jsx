import { Product } from "./Product"
export function ProductsGrid({products,loadcart}){

  return (
        <div className="products-grid">
        {
          products.map((i)=>{
            return (
              <Product key={i.id} i={i} loadcart={loadcart} />
            )
          })
        }
        </div>
  )
}