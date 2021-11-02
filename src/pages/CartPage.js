import { Box } from '@mui/system';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { shoppingCartContext, useShoppingCart } from '../context/shoppingCartContext';

const CartPage = () => {
  const { shoppingCart, addItemToCart } = useShoppingCart();

  if(shoppingCart.length < 1) {
    return <Layout>
      <Box>
        <button onClick={() => addItemToCart({id: '356', title: 'thing', price: '3000'})}>
          add something to the cart
          </button>
      </Box>
      theres no items to show here
    </Layout>
  }

  return (
    <Layout>
      <button onClick={() => addItemToCart({id: '356', title: 'thing', price: '3000'})}>
          add something to the cart
      </button>
      <Box>
        {shoppingCart.map(item => 
          <Box>{item.title} - {item.price}</Box>
        )}
      </Box>
    </Layout>
  )
};

export default CartPage;