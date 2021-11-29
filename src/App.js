import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import { Provider as ReduxProvider } from 'react-redux'
import store from "./redux";
import LoginPage from "./pages/LogIn";
import RegisterUserPage from "./pages/RegisterUserPage";

function App() {
  

  return (
    <ReduxProvider store={store}>
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
            <Route path="/register-user">
              <RegisterUserPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
    </ReduxProvider>
  );
}

export default App;
