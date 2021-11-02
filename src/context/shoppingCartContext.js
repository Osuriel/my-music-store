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
const REMOVE_FROM_CART_ACTION = "REMOVE_FROM_CART";


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

const removeToCartActionCreator = (itemId) => {
  return ({
    type: REMOVE_FROM_CART_ACTION,
    payload: {
      id: itemId
    }
  })
}

const reducer = (oldState, action) => {

  console.log('This will run when we dispatch an action');
  console.log('oldState: ', oldState);
  console.log('action: ', action);


  // Shape we want for our shopping cart state
  // const shoppingCartExample = [
  //   {
  //     id: '123',
  //     quantity: 2,
  //     price: 50000,
  //     title: 'piano',
  //     image: 'http://....',
  //   }
  // ];
  
  if(action.type === ADD_TO_CART_ACTION){
    const { payload: { id, title, price, image } }= action;

    const itemFound = oldState.find(item => item.id === action.payload.id);


    if(itemFound){
      return [
        ...oldState.filter(item => item.id !== action.payload.id),
        {
          ...itemFound,
          quantity: itemFound.quantity + 1,
        }
      ];
    }
    
    return [
      ...oldState,
      {
        id,
        title,
        price,
        image,
        quantity: 1,
      }
    ]
  }

  if(action.type === REMOVE_FROM_CART_ACTION){

    const itemFound = oldState.find(item => item.id === action.payload.id);

    if(itemFound){
      if(itemFound.quantity === 1){
       return  oldState.filter(item => item.id !== action.payload.id)
      }

      return [
        ...oldState.filter(item => item.id !== action.payload.id),
        {
          ...itemFound,
          quantity: itemFound.quantity - 1,
        }
      ];
    }
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

  const removeFromCart = (id) => {
    dispatch(
      removeToCartActionCreator(id)
    )
  };

  return (
    <shoppingCartContext.Provider value={{shoppingCart, addItemToCart, removeFromCart}}>
      {children}
    </shoppingCartContext.Provider>
  )
};