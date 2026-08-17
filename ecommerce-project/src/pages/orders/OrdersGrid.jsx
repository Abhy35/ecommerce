import axios from "axios";
import dayjs from "dayjs"
import {Link} from 'react-router';
// import { formatMoney } from "../../utils/money"
import { Fragment } from "react";
import { OrderHeader } from "./OrderHeader";
export function OrdersGrid({orders, loadcart}){
  // console.log(orders);
  return (orders.length!=0 &&
        <div className="orders-grid">
          {
            orders.map((order)=>{
                return (
                  <div key={order.id} className="order-container">
                    <OrderHeader order={order} />

                    <div className="order-details-grid">
                      {
                        order.products.map((OrderProduct)=>{
                          return (
                            <Fragment key={OrderProduct.productId}>
                              <div className="product-image-container">
                                <img src={OrderProduct.product.image} />
                              </div>

                              <div className="product-details">
                                <div className="product-name">
                                  {OrderProduct.product.name}
                                </div>
                                <div className="product-delivery-date">
                                  Arriving on: {dayjs(OrderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                </div>
                                <div className="product-quantity">
                                  Quantity: {OrderProduct.quantity}
                                </div>
                                <button className="buy-again-button button-primary"
                                onClick={async ()=>{
                                await axios.post('/api/cart-items', {
                                  productId: OrderProduct.productId,
                                  quantity: 1
                                })
                                await loadcart();
                              }} >
                                  <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                  <span className="buy-again-message">Add to Cart</span>
                                </button>
                              </div>

                              <div className="product-actions">
                                <Link to={`/tracking/${order.id}/${OrderProduct.productId}`}>
                                  <button className="track-package-button button-secondary">
                                    Track package
                                  </button>
                                </Link>
                              </div>
                            </Fragment>
                          )
                        })
                      }
                    </div>
                  </div>
                )
            })
          }

        </div>
  )
}