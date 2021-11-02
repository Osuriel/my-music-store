import './App.css';
import { ShoppingCartContextProvider } from './context/shoppingCartContext';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';

function App() {
  return (
    <ShoppingCartContextProvider>
       <CartPage />
    </ShoppingCartContextProvider>
  );
}

export default App;
