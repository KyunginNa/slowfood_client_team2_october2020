import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productServices from '../modules/productServices'

const OrderDetails = () => {
  const [renderOrder, setRenderOrder] = useState(false)
  const dispatch = useDispatch()
  const { credentials, orderDetails, itemsCountMessage, orderMessage } = useSelector(state => state)

  return (
    orderDetails &&
    <>
      <p data-cy="order-message">{orderMessage}</p>
      <p data-cy="items-count-message">{itemsCountMessage}</p>
      <button
        data-cy="btn-view-order"
        onClick={() => setRenderOrder(!renderOrder)}
      >View Order
      </button>
      {renderOrder &&
        <div data-cy="order-details">
          <ul>
            {orderDetails.products.map(item => {
              return (
                <li key={item.id}>{item.amount} × {item.name}</li>
              )
            })}
          </ul>
          <p>Total Price: {orderDetails.total * 0.01} USD </p>
          <button
            data-cy="btn-confirm-order"
            onClick={() => productServices.finalizeOrder(orderDetails, credentials, dispatch)}
          >Check Out
      </button>
        </div>
      }
    </>
  )
}

export default OrderDetails
