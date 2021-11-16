import { createStore } from "redux";

// ACTIONS
const LOG_IN_ACTION = "mymusicstore.com/LOG_IN";

const UPDATE_USER_FAVORITES = "mymusicstore.com/UPDATE_USER_FAVORITES";


// ACTION CREATORS
export const logInActionCreator = (user) => ({type: LOG_IN_ACTION, payload: {user: user}});

export const updateUserFavoritesActionCreator = (favoriteItems) => {
  return {
    type: UPDATE_USER_FAVORITES,
    payload: { favoriteItems }
  }
};


const reducer = (state, action) => {
  if(action.type === LOG_IN_ACTION){
    const { payload } = action;

    return {...state, user: payload.user}
  }

  if(action.type === UPDATE_USER_FAVORITES){

    return {...state, user: {...state.user, favoriteItems: action.payload.favoriteItems }}
  }

  return state;
};

const initialState = { user: undefined };

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store