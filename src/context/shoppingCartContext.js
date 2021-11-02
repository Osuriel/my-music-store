// Actions: simple javascript objects that tell us how the state should change. all actions must include a type propery.

// {
//   type: "indicates the type of action",
// }



// Hey I am the state reducer I get called everythime an action is dispatched.
// The arguments react calls me with are the currentstate and the action that was just dispatched.
// Whatever I return is the new state

import { createContext, useContext, useReducer } from "react";

export const shoppingCartContext = createContext();
export const useShoppingCart = () => useContext(shoppingCartContext);


const ADD_TO_CART_ACTION = "ADD_TO_CART";


// ACTION CREATORS
// Helper functions to easily create actions.

const addToCartActionCreator = ({
  id,
  title,
  price,
}) => {
  console.log('product id: ', id)
  return {
    type: ADD_TO_CART_ACTION,
    payload: {
      id,
      title,
      price,
    }
}};

const reducer = (oldState, action) => {

  console.log('This will run when we dispatch an action');
  console.log('oldState: ', oldState);
  console.log('action: ', action);
  
  if(action.type === ADD_TO_CART_ACTION){
    return [
      ...oldState,
      {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
      }
    ]
  }
};

export const ShoppingCartContextProvider = (props) => {
  
  const { children } = props;

  const [shoppingCart, dispatch] = useReducer(reducer, []);

  const addItemToCart = ({
    id,
    title,
    price,
  }) => {
    dispatch(
      addToCartActionCreator({
        id,
        title,
        price,
      })
    )
  }

  return (
    <shoppingCartContext.Provider value={{shoppingCart, addItemToCart}}>
      {children}
    </shoppingCartContext.Provider>
  )
};