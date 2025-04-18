import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer';
import Navigation from './reducers/NavigatorRef';
import CartReducer from './reducers/Cart';




const reducer={
    user:userReducer,
    nav:Navigation,
    cart:CartReducer

}
export const store = configureStore({
 reducer:reducer,
  devTools:true
})
export default store;