import { createStore } from "redux";

const reducer = (state, action) => {

  if(action.type === "LOG_IN"){
    const { payload } = action;

    return {...state, user: payload.user}
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