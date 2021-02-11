import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckOut from './CheckOut'
import productServices from '../modules/productServices'
import { Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton, Button } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { Container } from 'semantic-ui-react'

const DisplayProducts = () => {
  const [renderOrder, setRenderOrder] = useState(false)

  const dispatch = useDispatch()
  const { products, credentials, orderDetails, itemsCountMessage, orderMessage, orderFinalized } = useSelector(state => state)
  const handleOpen = () => {
    dispatch({ type: 'OPEN_REGISTRATION_FORM' })
  }

  useEffect(() => { productServices.getProducts(dispatch) }, [dispatch])
  return (
    <>
      <Container data-cy='products-index'>
        {products && products.map(product => {
          return (
            <Card data-cy='products-index' key={product.id} style={{ width: 345, height: 400, display: 'inline-block', margin: 10 }}>
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
                {credentials ?
                  (
                    <IconButton
                      size='small'
                      data-cy={`btn-add-product${product.id}`}
                      onClick={() => productServices.addToOrder(orderDetails, orderFinalized, product.id, product.name, credentials, dispatch)}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  )
                  :
                  (
                    <Button
                      size='small'
                      color='primary'
                      onClick={handleOpen}
                    >Sign up to add an item
                    </Button>
                  )
                }
              </CardActions>
            </Card>
          )
        })}
      </Container>
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
