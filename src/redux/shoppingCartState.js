import { useDispatch, useSelector } from "react-redux";
import { combineReducers, createStore } from "redux";

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

const getShoppingCartTotal = (shoppingCart) => {
  const total = shoppingCart.reduce(
    (accumulator, item, index, array) => {
      return accumulator + (item.price * item.quantity)
    }, 0);

  return total;
}


// ACTIONS
const ADD_TO_CART_ACTION = "ADD_TO_CART";
const REMOVE_FROM_CART_ACTION = "REMOVE_FROM_CART";
const EMPTY_CART_ACTION = "EMPTY_CART";


// ACTION CREATORS
export const addToCartActionCreator = ({
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

const cartInLocalStorage = window.localStorage.getItem('shoppingCart');

const initialState = cartInLocalStorage
? JSON.parse(cartInLocalStorage)
: []

export const shoppingCartReducer = (oldState = initialState, action) => {
  if(action.type === EMPTY_CART_ACTION){
    return [];
  }
  
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

  return oldState;
};






export const useReduxShoppingCart = () => {
  const dispatch = useDispatch();
  
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
  
  const emptyCart = () => {
    dispatch({ type: EMPTY_CART_ACTION })
  }

  const shoppingCart = useSelector(state => state.shoppingCart);
  
  return {
    addItemToCart,
    removeFromCart,
    emptyCart,
    shoppingCart,
    total: getShoppingCartTotal(shoppingCart),
  };
}