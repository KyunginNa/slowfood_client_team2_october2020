import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from 'react-stripe-elements'
import axios from 'axios'

const CheckOut = (props) => {
  const { credentials, orderDetails } = useSelector(state => state)
  const dispatch = useDispatch()

  const [paymentMessage, setPaymentMessage] = useState()
  const [paid, setPaid] = useState(false)

  const payWithStripe = async (e) => {
    debugger
    e.preventDefault()
    let stripeResponse = await props.stripe.createToken()
    try {
      debugger
      const response = await axios.post('http://localhost:3000/api/payments',
        { order_id: orderDetails.id, stripeToken: stripeResponse.token.id },
        { headers: credentials },
      )
      setPaymentMessage(response.data.message)
      setPaid(true)
      dispatch({ type: 'SET_ORDER_DETAILS', payload: null })
    } catch (err) {
      console.log(err)
      setPaymentMessage("Invalid card information. Please try it again.")
    }
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
