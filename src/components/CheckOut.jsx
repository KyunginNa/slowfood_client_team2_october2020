import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from 'react-stripe-elements'
import stripePayment from '../modules/stripePayment'

const CheckOut = (props) => {
  const { credentials, orderDetails, paymentMessage, paid } = useSelector(state => state)
  const dispatch = useDispatch()

  const payWithStripe = async (e) => {
    e.preventDefault()
    let stripeResponse = await props.stripe.createToken()
    stripePayment(orderDetails.id, stripeResponse.token.id, credentials, dispatch)
  }

  return (
    <>
      {!paid &&
        <form data-cy="payment-form">
          <div data-cy="card-number">
            <label>Card Number</label>
            <CardNumberElement />
          </div>
          <div data-cy="card-expiry">
            <label>Expiry Date</label>
            <CardExpiryElement />
          </div>
          <div data-cy="card-cvc">
            <label>CVC code</label>
            <CardCVCElement />
          </div>
          <button
            data-cy="btn-payment"
            onClick={payWithStripe}>
            Confrim Payment
          </button>
        </form>
      }
      <p data-cy="payment-message">{paymentMessage}</p>
    </>
  )
}

export default injectStripe(CheckOut)
