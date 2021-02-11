import React from 'react'
import { Elements } from 'react-stripe-elements'
import Header from './components/Header.jsx'
import DisplayProducts from './components/DisplayProducts'
import UserRegistration from './components/UserRegistration'
import CheckOut from './components/CheckOut'
import OrderDetails from './components/OrderDetails'
import { Grid } from 'semantic-ui-react'


const App = () => {
  return (
    <>
      <Header />
      <UserRegistration />
      <Grid textAlign='center'>
        <DisplayProducts />
        <OrderDetails />
        <Elements>
          <CheckOut />
        </Elements>
      </Grid>
    </>
  )
}

export default App
