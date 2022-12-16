import { configureStore } from "@reduxjs/toolkit"
// Import reducers to use
import productReducer from './reducers/productReducer'
import cardUIReducer from "./reducers/cardUIReducer"
import userReducer from "./reducers/userReducer"

export const store = configureStore({
  reducer: {
    // Set the reducers name as export reducers you define.
    products: productReducer,
    cartUI: cardUIReducer,
    userReducer: userReducer

  }
})

