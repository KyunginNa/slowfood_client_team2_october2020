import initialState from '../store/initialState'

const rootReducer = (state = initialState, action) => {
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
        orderFinalized: false,
        paid: false,
      }
    case 'SET_ITEMS_COUNT_MESSAGE':
      return {
        ...state,
        itemsCountMessage: action.payload,
      }
    case 'SET_ORDER_MESSAGE':
      return {
        ...state,
        orderMessage: action.payload,
      }
    case 'SET_PAYMENT_SUCCESS':
      return {
        ...state,
        paymentMessage: action.payload,
        paid: true,
      }
    case 'SET_PAYMENT_FAIL':
      return {
        ...state,
        paymentMessage: action.payload,
        paid: false,
      }
    case 'SET_ORDER_FINALIZED':
      return {
        ...state,
        orderFinalized: true,
      }
    case 'RESET_ORDER_DETAILS':
      return {
        ...state,
        orderDetails: action.payload,
      }
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      }
    case 'OPEN_REGISTRATION_FORM':
      return {
        ...state,
        setRegistrationOpen: true,
      }
    case 'CLOSE_REGISTRATION_FORM':
      return {
        ...state,
        setRegistrationOpen: false,
      }
    default:
      return state
  }
}

export default rootReducer
