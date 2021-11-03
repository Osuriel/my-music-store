  import { createContext, useContext, useReducer } from "react";
  
  export const shoppingCartContext = createContext();
  export const useShoppingCart = () => useContext(shoppingCartContext);
  
  
  // Actions: simple javascript objects that tell us how the state should change. all actions must include a type propery.
  const ADD_TO_CART_ACTION = "ADD_TO_CART";
  const REMOVE_FROM_CART_ACTION = "REMOVE_FROM_CART";
  
  
  // ACTION CREATORS
  // Helper functions to easily create actions.
  
const sortCartItems = (shoppingCartArray) => {
  const sorted =  shoppingCartArray.sort(function(x, y){
    console.log({x, y});
    console.log({xTimestamp: x.timestamp});

    console.log('number: ', y.timestamp - x.timestamp)

    return y.timestamp - x.timestamp;
  })

  console.log({shoppingCartArray, sorted })

  return sorted;
}

const addToCartActionCreator = ({
  id,
  title,
  price,
  image,
}) => {
  console.log('product id: ', id)
  return {
    type: ADD_TO_CART_ACTION,
    payload: {
      id,
      title,
      price,
      image,
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

  // Hey I am the state reducer I get called everythime an action is dispatched.
  // The arguments react calls me with are the currentstate and the action that was just dispatched.
  // Whatever I return is the new state
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
  //     timestamp: 47389478394,
  //     image: 'http://....',
  //   }
  // ];
  
  if(action.type === ADD_TO_CART_ACTION){
    const { payload: { id, title, price, image } }= action;

    const itemFound = oldState.find(item => item.id === action.payload.id);


    if(itemFound){
      return sortCartItems([
        ...oldState.filter(item => item.id !== action.payload.id),
        {
          ...itemFound,
          quantity: itemFound.quantity + 1,
        }
      ]);
    }
    
    return sortCartItems([
      ...oldState,
      {
        id,
        title,
        price,
        image,
        quantity: 1,
        timestamp: Date.now(),
      }
    ])
  }

  if(action.type === REMOVE_FROM_CART_ACTION){

    const itemFound = oldState.find(item => item.id === action.payload.id);

    if(itemFound){
      if(itemFound.quantity === 1){
       return  sortCartItems(oldState.filter(item => item.id !== action.payload.id))
      }

      return sortCartItems([
        ...oldState.filter(item => item.id !== action.payload.id),
        {
          ...itemFound,
          quantity: itemFound.quantity - 1,
        }
      ]);
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
    image,
  }) => {
    dispatch(
      addToCartActionCreator({
        id,
        title,
        price,
        image,
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