import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const DisplayProducts = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const getProducts = async () => {
    let products = await axios.get('http://localhost:3000/api/products')
    dispatch({ type: "GET_PRODUCTS", payload: products.data.products })
  }
  useEffect(getProducts, [])

  return (
    <div data-cy='products-index' >
      {products && products.map(product => {
        return (
          <div key={product.id}>
            {product.name}
            {product.description}
            {product.price}
          </div>)
      })}
    </div>
  )
}

export default DisplayProducts
