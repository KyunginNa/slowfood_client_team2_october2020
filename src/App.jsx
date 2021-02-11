import React from 'react'
import { Elements } from 'react-stripe-elements'
import Header from './components/Header.jsx'
import DisplayProducts from './components/DisplayProducts'
import UserRegistration from './components/UserRegistration'
import CheckOut from './components/CheckOut'
import OrderDetails from './components/OrderDetails'

const App = () => {
  return (
    <>
      <Header />
      <UserRegistration />
      <DisplayProducts />
      <OrderDetails />
      <Elements>
        <CheckOut />
      </Elements>
    </>
  )
}

export default App
