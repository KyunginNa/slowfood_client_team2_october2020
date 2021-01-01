import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const DisplayProducts = () => {
  const [orderMessage, setOrderMessasge] = useState()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const credentials = useSelector(state => state.credentials)
  const getProducts = async () => {
    let products = await axios.get('http://localhost:3000/api/products')
    dispatch({ type: "GET_PRODUCTS", payload: products.data.products })
  }
  useEffect(getProducts, [])

  const addToOrder = async (productID) => {
    let response = await axios.post(
      "http://localhost:3000/api/orders",
      { product_id: productID },
      { headers: credentials },
    )
    setOrderMessasge(response.data.message)
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
                onClick={() => addToOrder(product.id)}
              >Add To Order
          </button>
            </div>)
        })}
      </div >
      <p data-cy="order-message">{orderMessage}</p>
    </>
  )
}

export default DisplayProducts
