import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';

import {
  Card, CardActions, CardContent, CardHeader,
  CardMedia, IconButton, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';


const ProductList = (props) => {
  const {products, addItemToCart} = props;

  return (
    <Box>
      {products.map(product => (
        <Box mb={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              action={
                <Box>
                  <Typography color="secondary" fontWeight="bold">
                    $ {product.price / 100} 
                  </Typography>
                </Box>
              }
              title={product.title}
              subheader={product.brand}
            />
            <CardMedia
              component="img"
              height="194"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: "100%"}}>
                <Button variant="text"
                onClick={
                  () => addItemToCart({ id: product.id, title: product.title, price: product.price})}
                  >
                    Add to cart
                  </Button>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;