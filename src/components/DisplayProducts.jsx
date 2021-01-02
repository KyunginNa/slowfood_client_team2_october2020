import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const DisplayProducts = () => {
  const [orderMessage, setOrderMessasge] = useState()
  const [orderID, setOrderID] = useState()
  const [itemsCountMessage, setItemsCountMessage] = useState()
  const [orderDetails, setOrderDetails] = useState()
  const [renderOrder, setRenderOrder] = useState(false)
  const [orderConfirmMessage, setOrderConfirmMessage] = useState()

  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const credentials = useSelector(state => state.credentials)

  const getProducts = async () => {
    let products = await axios.get('http://localhost:3000/api/products')
    dispatch({ type: "GET_PRODUCTS", payload: products.data.products })
  }
  useEffect(getProducts, [])

  const addToOrder = async (productID, productName) => {
    if (orderID && !orderConfirmMessage) {
      let response = await axios.put(`http://localhost:3000/api/orders/${orderID}`,
        { product_id: productID },
        { headers: credentials },
      )
      let totalItems = 0
      response.data.order.products.map(product => {
        return (
          totalItems += product.amount
        )
      })
      setOrderDetails(response.data.order)
      setItemsCountMessage(`You have ${response.data.order.products.length} items in your order.`)
      setOrderMessasge(`${response.data.message} (1 × ${productName})`)
    } else {
      let response = await axios.post(
        "http://localhost:3000/api/orders",
        { product_id: productID },
        { headers: credentials },
      )
      setOrderDetails(response.data.order)
      setOrderID(response.data.order.id)
      setItemsCountMessage(`You have 1 item in your order.`)
      setOrderMessasge(`${response.data.message} (1 × ${productName})`)
    }
  }

  const finalizeOrder = async () => {
    let response = await axios.put(`http://localhost:3000/api/orders/${orderID}`,
      { activity: 'finalize' },
      { headers: credentials },
    )
    setOrderConfirmMessage(response.data.message)
    setOrderDetails()
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
              <button
                data-cy={`btn-add-product${product.id}`}
                onClick={() => addToOrder(product.id, product.name)}
              >Add To Order
                </button>
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
                  Confirm Order
              </button>
              </div>
            </>
          }
        </>
      }
      {orderConfirmMessage &&
        <p data-cy="order-confirm-message">{orderConfirmMessage}</p>
      }
    </>
  )
}

export default DisplayProducts
