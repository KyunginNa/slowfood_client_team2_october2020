import React from 'react'
import { Elements } from 'react-stripe-elements'
import Header from './components/Header.jsx'
import DisplayProducts from './components/DisplayProducts'
import UserRegistration from './components/UserRegistration'

const App = () => {
  return (
    <>
      <Header />
      <UserRegistration />
      <Elements>
        <DisplayProducts />
      </Elements>

    </>
  )
}

export default App
