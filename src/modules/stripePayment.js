import axios from 'axios'

const payWithStripe = async (orderId, stripeToken, credentials, dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/payments',
      {
        order_id: orderId,
        stripeToken: stripeToken,
      },
      { headers: credentials }
    )
    dispatch({ type: 'SET_PAYMENT_SUCCESS', payload: response.data.message })
    dispatch({ type: 'RESET_ORDER_DETAILS', payload: null })
  } catch (err) {
    dispatch({
      type: 'SET_PAYMENT_FAIL',
      payload: 'Invalid payment information. Please try again.',
    })
  }
}

export default payWithStripe
