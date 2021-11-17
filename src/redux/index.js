import { combineReducers, createStore } from "redux";
import { shoppingCartReducer } from "./shoppingCartState";
import { userReducer } from "./userState";

const rootReducer = combineReducers({
    user: userReducer,
    shoppingCart: shoppingCartReducer,
  })

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store