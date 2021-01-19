const rootReducer = (state = { credentials: {} }, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      }

    case 'SET_CURRENT_USER':
      return {
        ...state,
        credentials: action.payload,
      }

    case 'SET_ORDER_DETAILS':
      return {
        ...state,
        orderDetails: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer
