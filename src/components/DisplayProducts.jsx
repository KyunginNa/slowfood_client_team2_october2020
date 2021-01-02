import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const DisplayProducts = () => {
  const [orderMessage, setOrderMessasge] = useState()
  const [orderID, setOrderID] = useState()
  const [itemsCountMessage, setItemsCountMessage] = useState()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const credentials = useSelector(state => state.credentials)
  const getProducts = async () => {
    let products = await axios.get('http://localhost:3000/api/products')
    dispatch({ type: "GET_PRODUCTS", payload: products.data.products })
  }
  useEffect(getProducts, [])

  const addToOrder = async (productID, productName) => {
    if (orderID) {
      let response = await axios.put(`http://localhost:3000/api/orders/${orderID}`,
        { product_id: productID },
        { headers: credentials },
      )
      setItemsCountMessage(`You have ${response.data.order.products.length} items in your order.`)
      setOrderMessasge(`${response.data.message} (1 × ${productName})`)
    } else {
      let response = await axios.post(
        "http://localhost:3000/api/orders",
        { product_id: productID },
        { headers: credentials },
      )
      setOrderID(response.data.order.id)
      setItemsCountMessage(`You have 1 item in your order.`)
      setOrderMessasge(`${response.data.message} (1 × ${productName})`)
    }
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
      <p data-cy="order-message">{orderMessage}</p>
      <p data-cy="items-count-message">{itemsCountMessage}</p>
    </>
  )
}

export default DisplayProducts
