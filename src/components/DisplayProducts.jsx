import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckOut from './CheckOut'
import productServices from '../modules/productServices'

const DisplayProducts = () => {
  const [renderOrder, setRenderOrder] = useState(false)

  const dispatch = useDispatch()
  const { products, credentials, orderDetails, itemsCountMessage, orderMessage, orderFinalized } = useSelector(state => state)

  useEffect(() => { productServices.getProducts(dispatch) }, [])
  return (
    <>
      <div data-cy='products-index'>
        {products && products.map(product => {
          return (
            <div
              key={product.id}
              data-cy={`product-${product.id}`}
            >
              {product.name}
              {product.description}
              {product.price}
              {credentials &&
                <button
                  data-cy={`btn-add-product${product.id}`}
                  onClick={() => productServices.addToOrder(orderDetails, orderFinalized, product.id, product.name, credentials, dispatch)}
                >Add To Order
                </button>
              }
            </div>
          )
        })}
      </div >
      {orderDetails &&
        <>
          <p data-cy="order-message">{orderMessage}</p>
          <p data-cy="items-count-message">{itemsCountMessage}</p>
          <button
            data-cy="btn-view-order"
            onClick={() => setRenderOrder(!renderOrder)}>
            View Order
          </button>
          {
            renderOrder &&
            <>
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
                  onClick={() => productServices.finalizeOrder(orderDetails, credentials, dispatch)}>
                  Check Out
              </button>
              </div>
            </>
          }
        </>
      }
      <CheckOut />
    </>
  )
}

export default DisplayProducts
