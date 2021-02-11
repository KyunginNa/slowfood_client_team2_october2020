import axios from 'axios'

const productServices = {
  async getProducts(dispatch) {
    let products = await axios.get('http://localhost:3000/api/products')
    dispatch({ type: 'GET_PRODUCTS', payload: products.data.products })
  },

  async addToOrder(
    orderDetails,
    orderFinalized,
    productID,
    productName,
    credentials,
    dispatch
  ) {
    if (orderDetails && !orderFinalized) {
      let response = await axios.put(
        `http://localhost:3000/api/orders/${orderDetails.id}`,
        { product_id: productID },
        { headers: credentials }
      )
      let totalItems = 0
      response.data.order.products.map((product) => {
        return (totalItems += product.amount)
      })
      dispatch({ type: 'SET_ORDER_DETAILS', payload: response.data.order })
      dispatch({
        type: 'SET_ITEMS_COUNT_MESSAGE',
        payload: `You have ${totalItems} items in your order.`,
      })
      dispatch({
        type: 'SET_ITEMS_COUNT',
        payload: totalItems,
      })
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: `${response.data.message} (1 × ${productName})`,
      })
    } else {
      let response = await axios.post(
        'http://localhost:3000/api/orders',
        { product_id: productID },
        { headers: credentials }
      )
      dispatch({ type: 'SET_ORDER_DETAILS', payload: response.data.order })
      dispatch({
        type: 'SET_ITEMS_COUNT_MESSAGE',
        payload: 'You have 1 item in your order.',
      })
      dispatch({
        type: 'SET_ITEMS_COUNT',
        payload: 1,
      })
      dispatch({
        type: 'SET_ORDER_MESSAGE',
        payload: `${response.data.message} (1 × ${productName})`,
      })
    }
  },

  async finalizeOrder(orderDetails, credentials, dispatch) {
    await axios.put(
      `http://localhost:3000/api/orders/${orderDetails.id}`,
      { activity: 'finalize' },
      { headers: credentials }
    )
    dispatch({ type: 'SET_ORDER_FINALIZED' })
  },
}

export default productServices
