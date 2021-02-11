import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productServices from '../modules/productServices'
import { Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton, Button } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { Grid } from 'semantic-ui-react'

const DisplayProducts = () => {
  const dispatch = useDispatch()
  const { products, credentials, orderDetails, orderFinalized } = useSelector(state => state)
  const handleOpen = () => {
    dispatch({ type: 'OPEN_REGISTRATION_FORM' })
  }

  useEffect(() => { productServices.getProducts(dispatch) }, [dispatch])
  return (
    <Grid.Column width={12} data-cy='products-index'>
      {products && products.map(product => {
        return (
          <Card data-cy='products-index' key={product.id} style={{ width: 330, height: 420, display: 'inline-block', margin: 10 }}>
            <CardHeader
              title={product.name}
              subheader={product.price}
            />
            <CardActionArea>
              <CardMedia
                image={`/images/product-${product.id}.jpg`}
                style={{ height: 200 }}
              />
              <CardContent style={{ height: 100 }}>
                <Typography variant='body1' component='p' style={{ textAlign: 'left' }}>
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
    </Grid.Column>
  )
}

export default DisplayProducts
