import { Box } from '@mui/system';
import React, { useEffect, useReducer, useState } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../fetchData';

const HomePage = () => {
  const [productData, setProductData] = useState([]);

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
        <ProductList products={productData} />
      </Box>
    </Layout>
  )
};

export default HomePage;