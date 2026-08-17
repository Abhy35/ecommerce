import dayjs from "dayjs";
import axios from "axios";
export function DeliveryOption({deliveryOption, i, loadcart}){

  return (
                  <div className="delivery-options">
                          <div className="delivery-options-title">
                            Choose a delivery option:
                          </div>
                          {
                            deliveryOption.map((j)=>{
                          
                              let pricestring = 'FREE SHIPPING';
                              if(j.priceCents==499){
                                pricestring='$4.99 - SHIPPING'
                              }
                              else if(j.priceCents==999){
                                pricestring='$9.99 - SHIPPING'
                              }

                              const updateDeliveryOption = async ()=>{
                              await axios.put(`/api/cart-items/${i.productId}`,{
                              deliveryOptionId : j.id
                              });
                              await loadcart();
                              }

                              return (
                                <div key={j.id} className="delivery-option"
                                onClick={
                                  updateDeliveryOption
                                } >
                                <input type="radio" 
                                onChange={()=>{}}
                                checked={j.id=== i.deliveryOptionId}
                                  className="delivery-option-input"
                                  name={`delivery-option-${i.id}`} />
                                <div>
                                  <div className="delivery-option-date">
                                    {dayjs(j.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    {/* Tuesday, June 21 */}
                                  </div>
                                  <div className="delivery-option-price">
                                    {pricestring}
                                  </div>
                                </div>
                                </div>
                              )
                            })
                          }
    
                        </div>
  )
}