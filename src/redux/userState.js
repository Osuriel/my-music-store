import { logInUser } from "../fetchData";

// ACTIONS
const LOG_IN_ACTION = "mymusicstore.com/LOG_IN";

const UPDATE_USER_FAVORITES = "mymusicstore.com/UPDATE_USER_FAVORITES";

// ACTION CREATORS
export const logInActionCreator = ({email, password}) => 
  async (dispatch, getState) => {
    console.log('logInActionCreator running');
    try {
      const user = await logInUser(email, password);
      dispatch({type: LOG_IN_ACTION, payload: {user: user}});
    } catch(error){
      console.log('error');
    }
  }

export const updateUserFavoritesActionCreator = (favoriteItems) => {
  return {
    type: UPDATE_USER_FAVORITES,
    payload: { favoriteItems }
  }
};



export const userReducer = (state = null, action) => {
  if(action.type === LOG_IN_ACTION){
    const { payload } = action;

    return payload.user
  }

  if(action.type === UPDATE_USER_FAVORITES){

    return {...state.user, favoriteItems: action.payload.favoriteItems }
  }

  return state;
};