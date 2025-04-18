const initialState = {
    data: 0,
    submitloading:false,
    error:null,
    loading:false,
    total:0,

  };
  
  const CartReducer= (state = initialState, action) => {
    switch (action.type) {
      case "GET_CART":
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
        case "SET_CART":
            return {
              ...state,
              data: action.payload,
              total:action.totalValue,
              loading: false,
              error: null,
            };
         
      default:
        
        return state;
    }
  };
  
  export default CartReducer;
  