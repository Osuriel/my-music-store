import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import { ShoppingCartContextProvider } from './context/shoppingCartContext';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';

function App() {

  return (
    <ShoppingCartContextProvider>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </ShoppingCartContextProvider>
  );
}

export default App;
