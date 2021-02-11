import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckOut from './CheckOut'
import productServices from '../modules/productServices'
import { Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const DisplayProducts = () => {
  const [renderOrder, setRenderOrder] = useState(false)

  const dispatch = useDispatch()
  const { products, credentials, orderDetails, itemsCountMessage, orderMessage, orderFinalized } = useSelector(state => state)

  useEffect(() => { productServices.getProducts(dispatch) }, [dispatch])
  return (
    <>
      <div data-cy='products-index'>
        {products && products.map(product => {
          return (
            <Card data-cy='products-index' key={product.id} style={{ maxWidth: 345, height: 400 }}>
              <CardHeader
                title={product.name}
                subheader={product.price}
              />
              <CardActionArea>
                <CardMedia
                  image={`/images/product-${product.id}.jpg`}
                  style={{ height: 200 }}
                />
                <CardContent>
                  <Typography variant='body1' component='p'>
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {credentials &&
                  <IconButton
                    data-cy={`btn-add-product${product.id}`}
                    onClick={() => productServices.addToOrder(orderDetails, orderFinalized, product.id, product.name, credentials, dispatch)}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                }
              </CardActions>
            </Card>
          )
        })}
      </div>
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
