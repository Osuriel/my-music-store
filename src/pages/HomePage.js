import { Box } from '@mui/system';
import React, { useEffect, useReducer, useState } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../fetchData';

const ADD_TO_CART_ACTION = "ADD_TO_CART";


// ACTION CREATORS
// Helper functions to easily create actions.

const addToCartActionCreator = ({
  id,
  title,
  price,
}) => {



return {
  type: ADD_TO_CART_ACTION,
  payload: {
    id,
    title,
    price,
  }
}};


// Actions: simple javascript objects that tell us how the state should change. all actions must include a type propery.

// {
//   type: "indicates the type of action",
// }



// Hey I am the state reducer I get called everythime an action is dispatched.
// The arguments react calls me with are the currentstate and the action that was just dispatched.
// Whatever I return is the new state
const reducer = (oldState, action) => {

  console.log('This will run when we dispatch an action');
  console.log('oldState: ', oldState);
  console.log('action: ', action);
  
  if(action.type === ADD_TO_CART_ACTION){
    return [
      ...oldState,
      {
        id: action.id,
        title: action.payload.title,
        price: action.payload.price,
      }
    ]
  }
};

const HomePage = () => {
  const [productData, setProductData] = useState([]);

  const [shoppingCart, dispatch] = useReducer(reducer, []);

  const addItemToCart = ({
    id,
    title,
    price,
  }) => {

    dispatch(
      addToCartActionCreator({
        id,
        title,
      })
    )

    // setShoppingCart([[
    //   ...shoppingCart,
    //   {
    //     id,
    //     title,
    //     price,
    //   },
    // ]]);
  }


  // We want to only fetch data after the first render. not after every render.
  // That is the reason were using the useEffect hook and passing and empty array as the second argument.
  useEffect(() => {
    fetchProducts().then(
      productData => {
        setProductData(productData);
      }
    )
  }, []);

  return (
    <Layout>
      <Box sx={{ height: '500px' }}>
        {shoppingCart.map(item => <p>{item.title} - $ {item.price / 100}</p>)}
        <ProductList products={productData} addItemToCart={addItemToCart} />
      </Box>
    </Layout>
  )
};

export default HomePage;