import { List } from 'semantic-ui-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Segment, Button, Icon, Label } from 'semantic-ui-react'
import productServices from '../modules/productServices'

const OrderDetails = () => {
  const [renderOrder, setRenderOrder] = useState(false)
  const dispatch = useDispatch()
  const { credentials, orderDetails, itemsCountMessage, orderMessage, itemsCount } = useSelector(state => state)

  return (
    <Grid.Column width={4} style={{ marginLeft: '-2em', marginTop: 10 }}>
      <Segment>
        {!orderDetails ?
          <p>
            <Icon name='shopping cart' />
            Your cart is empty!
          </p>
          :
          <>
            <p data-cy="order-message">{orderMessage}</p>
            <p data-cy="items-count-message">{itemsCountMessage}</p>
            <Button
              as='div'
              labelPosition='right'
              data-cy="btn-view-order"
              onClick={() => setRenderOrder(!renderOrder)}>
              <Button color='blue'>
                <Icon name='shopping cart' />
              View Order
            </Button>
              <Label as='a' basic color='blue' pointing='left'>
                {itemsCount}
              </Label>
            </Button>
            {renderOrder &&
              <Segment data-cy="order-details">
                <List divided relaxed>
                  <h5>Order Details</h5>
                  {orderDetails.products.map(item => {
                    return (
                      <List.Item key={item.id}>
                        {item.amount} × {item.name}
                      </List.Item>
                    )
                  })}
                </List>
                <p>Total Price: {orderDetails.total * 0.01} USD </p>
                <Button
                  as='div'
                  labelPosition='right'
                  data-cy="btn-confirm-order"
                  onClick={() => productServices.finalizeOrder(orderDetails, credentials, dispatch)}>
                  <Button color='red'>
                    <Icon name='credit card outline' />
                  Check Out
                </Button>
                  <Label as='a' basic color='red' pointing='left'>
                    ${orderDetails.total * 0.01}
                  </Label>
                </Button>
              </Segment>
            }
          </>
        }
      </Segment>
    </Grid.Column>
  )
}

export default OrderDetails
