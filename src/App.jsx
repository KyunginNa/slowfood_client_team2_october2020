import React from 'react'
import { Elements } from 'react-stripe-elements'
import DisplayProducts from './components/DisplayProducts'
import UserRegistration from './components/UserRegistration'

const App = () => {
  return (
    <>
      <h1>K-FOOD</h1>
      <UserRegistration />
      <Elements>
        <DisplayProducts />
      </Elements>

    </>
  )
}

export default App
