import dayjs from "dayjs"
export function DeliveryDate({selectDeliveryOption}){
    if (!selectDeliveryOption) {
    return <div className="delivery-date">Loading...</div>;
  }
  return (
          <div className="delivery-date">
            Delivery Date : {dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>
  )
}