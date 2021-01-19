import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckOut from './CheckOut'
import axios from 'axios'

const DisplayProducts = () => {
  const [orderMessage, setOrderMessasge] = useState()
  const [itemsCountMessage, setItemsCountMessage] = useState()
  const [renderOrder, setRenderOrder] = useState(false)
  const [orderFinalized, setOrderFinalized] = useState(false)

  const dispatch = useDispatch()

  const { products, credentials, orderDetails } = useSelector(state => state)

  const getProducts = async () => {
    let products = await axios.get('http://localhost:3000/api/products')
    dispatch({ type: "GET_PRODUCTS", payload: products.data.products })
  }
  useEffect(getProducts, [])

  const addToOrder = async (productID, productName) => {
    if (orderDetails && !orderFinalized) {
      let response = await axios.put(`http://localhost:3000/api/orders/${orderDetails.id}`,
        { product_id: productID },
        { headers: credentials },
      )
      let totalItems = 0
      response.data.order.products.map(product => {
        return (
          totalItems += product.amount
        )
      })
      dispatch({ type: 'SET_ORDER_DETAILS', payload: response.data.order })
      setItemsCountMessage(`You have ${response.data.order.products.length} items in your order.`)
      setOrderMessasge(`${response.data.message} (1 × ${productName})`)
    } else {
      let response = await axios.post(
        "http://localhost:3000/api/orders",
        { product_id: productID },
        { headers: credentials },
      )
      dispatch({ type: 'SET_ORDER_DETAILS', payload: response.data.order })
      setItemsCountMessage(`You have 1 item in your order.`)
      setOrderMessasge(`${response.data.message} (1 × ${productName})`)
    }
  }

  const finalizeOrder = async () => {
    let response = await axios.put(`http://localhost:3000/api/orders/${orderDetails.id}`,
      { activity: 'finalize' },
      { headers: credentials },
    )
    setOrderFinalized(response.data.finalized)
  }

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
              { credentials &&
                <button
                  data-cy={`btn-add-product${product.id}`}
                  onClick={() => addToOrder(product.id, product.name)}
                >Add To Order
                </button>
              }
            </div>
          )
        })}
      </div >
      { orderDetails &&
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
                <p>Total Price: {orderDetails.total} USD </p>
                <button
                  data-cy="btn-confirm-order"
                  onClick={finalizeOrder}>
                  Check Out
              </button>
              </div>
            </>
          }
        </>
      }
      {orderFinalized &&
        <CheckOut />
      }
    </>
  )
}

export default DisplayProducts
