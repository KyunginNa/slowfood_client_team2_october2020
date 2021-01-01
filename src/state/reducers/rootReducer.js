const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_UID":
      return {
        ...state,
        uid: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
