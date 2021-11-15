import { Box } from '@mui/system';
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = (props) => {
  const {products} = props;
  
  return (
    <Box>
      {products.map(product => (
        <Box mb={6} key={product.id}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;