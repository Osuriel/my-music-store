import { useState } from 'react';
import './App.css';
import { ShoppingCartContextProvider } from './context/shoppingCartContext';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';

function App() {

  const currentPage = window.location.href.split('3000/').at(-1);

  return (
    <ShoppingCartContextProvider>
      {
        currentPage === 'cart' ? <CartPage /> : <HomePage />
      }
    </ShoppingCartContextProvider>
  );
}

export default App;
