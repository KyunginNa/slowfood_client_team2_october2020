import React, { Component } from 'react'
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from 'react-stripe-elements'
import axios from 'axios'

class CheckOut extends Component {
  state = {
    paymentMessage: "",
    paid: false
  }
  payWithStripe = async (e) => {
    e.preventDefault()
    let stripeResponse = await this.props.stripe.createToken()
    try {
      const response = await axios.post('http://localhost:3000/api/payments',
        { order_id: this.props.orderID, stripeToken: stripeResponse.token.id },
        { headers: this.props.credentials },
      )
      this.setState({ paymentMessage: response.data.message, paid: true })
    } catch (err) {
      console.log(err)
      this.setState({ paymentMessage: "Invalid card information. Please try it again." })
    }
  }

  render() {
    return (
      <>
        {!this.state.paid &&
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
              onClick={this.payWithStripe}>
              Confrim Payment
          </button>
          </form>
        }
        <p data-cy="payment-message">{this.state.paymentMessage}</p>
      </>
    )
  }
}

export default injectStripe(CheckOut)
