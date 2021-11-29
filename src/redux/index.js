import { combineReducers, createStore } from "redux";
import { shoppingCartReducer } from "./shoppingCartState";
import { userReducer } from "./userState";

import { configureStore } from '@reduxjs/toolkit'

  const store = configureStore({
    reducer: {
      user: userReducer,
      shoppingCart: shoppingCartReducer,
    }
  })
  
export default store