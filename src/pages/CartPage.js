import { Box } from '@mui/system';
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { shoppingCartContext, useShoppingCart } from '../context/shoppingCartContext';

const CartPage = () => {
  const { shoppingCart } = useShoppingCart();

  if(shoppingCart.length < 1) {
    return (
    <Layout>
      theres no items to show here
    </Layout>
    )
  }

  return (
    <Layout>
      <Box>
        {shoppingCart.map(item => 
          <Box>{item.title} - {item.price}</Box>
        )}
      </Box>
    </Layout>
  )
};

export default CartPage;