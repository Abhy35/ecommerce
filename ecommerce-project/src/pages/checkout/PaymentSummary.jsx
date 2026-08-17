import axios from "axios"
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money"
export function PaymentSummary({payment, loadcart}){
  let navigate = useNavigate();
  const createOrder = async ()=>{
    await axios.post(`/api/orders`);
    await loadcart();
    navigate('/orders');
  }
  return (
            <div className="payment-summary">
              <div className="payment-summary-title">
                Payment Summary
              </div>

              <div className="payment-summary-row">
                <div>Items ({payment.totalItems}):</div>
                <div className="payment-summary-money">${formatMoney(payment.productCostCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">${formatMoney(payment.shippingCostCents)}</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">${formatMoney(payment.totalCostBeforeTaxCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">${formatMoney(payment.taxCents)}</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">${formatMoney(payment.totalCostCents)}</div>
              </div>

              <button className="place-order-button button-primary"
              onClick={createOrder} >
                Place your order
              </button>
          </div>
  )
}