import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import { ShoppingCartContextProvider } from './context/shoppingCartContext';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import { createStore } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import store from "./redux";
import LoginPage from "./pages/LogIn";

function App() {
  

  return (
    <ReduxProvider store={store}>
      <ShoppingCartContextProvider>
        <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/cart">
              <CartPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </ShoppingCartContextProvider>
    </ReduxProvider>
  );
}

export default App;
