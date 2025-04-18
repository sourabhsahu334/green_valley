const initialState = {
    data: null,
    submitloading:false,
    error:null,
    loading:false,
    

  };
  
  const userReducer= (state = initialState, action) => {
    switch (action.type) {
      case "GET_USER":
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      case "REGISTER_TRUCK":
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
        case "LOGIN_MINE":
          return {
            ...state,
            data: action.payload,
            loading: false,
            error: null,
          };
        case "REGISTER_COMPANY":
          return {
            ...state,
            data: action.payload,
            loading: false,
            error: null,
          };
          case "REGISTER_COMPANY_FAILED":
            return {
              ...state,
              data: action.payload,
              loading: false,
              error: null,
            };



     
      default:
        
        return state;
    }
  };
  
  export default userReducer;
  