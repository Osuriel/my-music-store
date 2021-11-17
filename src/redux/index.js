import { createStore } from "redux";

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
const LOG_IN_ACTION = "mymusicstore.com/LOG_IN";

const UPDATE_USER_FAVORITES = "mymusicstore.com/UPDATE_USER_FAVORITES";

// The actions for the shopping cart.
const ADD_TO_CART_ACTION = "ADD_TO_CART";
const REMOVE_FROM_CART_ACTION = "REMOVE_FROM_CART";
const EMPTY_CART_ACTION = "EMPTY_CART";


// ACTION CREATORS
export const logInActionCreator = (user) => ({type: LOG_IN_ACTION, payload: {user: user}});

export const updateUserFavoritesActionCreator = (favoriteItems) => {
  return {
    type: UPDATE_USER_FAVORITES,
    payload: { favoriteItems }
  }
};

// Shopping cart action creators
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



const reducer = (state, action) => {
  if(action.type === LOG_IN_ACTION){
    const { payload } = action;

    return {...state, user: payload.user}
  }

  if(action.type === UPDATE_USER_FAVORITES){

    return {...state, user: {...state.user, favoriteItems: action.payload.favoriteItems }}
  }

  // Handling actions for shoppingCart
  if(action.type === EMPTY_CART_ACTION){
    return {...state, shoppingCart: []};
  }
  
  if(action.type === ADD_TO_CART_ACTION){
    const { payload: { id, title, price, image } }= action;

    const itemFound = state.shoppingCart.find(item => item.id === action.payload.id);


    if(itemFound){
      return {
        ...state,
        shoppingCart: 
        sortCartItems([
          ...state.shoppingCart.filter(item => item.id !== action.payload.id),
          {
            ...itemFound,
            quantity: itemFound.quantity + 1,
          }
        ]),
      }
    }
    
    return {
      ...state,
      shoppingCart: sortCartItems([
        ...state.shoppingCart,
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
  }

  if(action.type === REMOVE_FROM_CART_ACTION){

    const itemFound = state.shoppingCart.find(item => item.id === action.payload.id);

    if(itemFound){
      if(itemFound.quantity === 1){
       return  {
         ...state,
         shoppingCart: sortCartItems(state.shoppingCart.filter(item => item.id !== action.payload.id))
       }
      }

      return {
        ...state,
        shoppingCart: sortCartItems([
          ...state.shoppingCart.filter(item => item.id !== action.payload.id),
          {
            ...itemFound,
            quantity: itemFound.quantity - 1,
          }
        ]),
      }
    }
  }

  return state;
};

const initialState = {
  user: undefined,
  shoppingCart: [],
};

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store