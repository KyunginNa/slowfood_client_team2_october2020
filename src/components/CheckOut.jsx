import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import stripePayment from '../modules/stripePayment'
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from 'react-stripe-elements'
import { Modal, Form, Button } from 'semantic-ui-react'
import { Alert, AlertTitle } from '@material-ui/lab'

const CheckOut = (props) => {
  const { credentials, orderDetails, paymentMessage, paid, orderFinalized, setPaymentOpen } = useSelector(state => state)
  const dispatch = useDispatch()

  const payWithStripe = async (e) => {
    e.preventDefault()
    let stripeResponse = await props.stripe.createToken()
    stripePayment(orderDetails.id, stripeResponse.token.id, credentials, dispatch)
  }

  const handleOpen = () => {
    dispatch({ type: 'OPEN_PAYMENT_FORM' })
  }

  const handleClose = () => {
    dispatch({ type: 'CLOSE_PAYMENT_FORM' })
    dispatch({ type: 'CLEAR_PAYMENT_MESSAGE' })
  }

  return (
    <>
      {!paid && orderFinalized &&
        <Modal open={setPaymentOpen} onClose={handleClose} onOpen={handleOpen}>
          <Modal.Header>Payment</Modal.Header>
          <Modal.Content>
            <Form data-cy="payment-form" style={{ margin: 20 }}>
              <Form.Field data-cy="card-number">
                <label>Card Number</label>
                <CardNumberElement />
              </Form.Field >
              <Form.Field data-cy="card-expiry">
                <label>Expiry Date</label>
                <CardExpiryElement />
              </Form.Field>
              <Form.Field data-cy="card-cvc">
                <label>CVC code</label>
                <CardCVCElement />
              </Form.Field>
            </Form>
            {!paid &&
              paymentMessage &&
              <Alert severity="Error">
                <AlertTitle>Error</AlertTitle>
                {paymentMessage}
              </Alert>
            }
          </Modal.Content>
          <Modal.Actions>
            <Button
              data-cy="btn-payment"
              onClick={payWithStripe}
              basic
              color='red'
            >Confrim Payment
            </Button>
            <Button
              onClick={handleClose}
            >Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      }
      {paid &&
        <Alert severity="success" data-cy="payment-message">
          <AlertTitle>Success</AlertTitle>
          {paymentMessage}
        </Alert>
      }
    </>
  )
}

export default injectStripe(CheckOut)
