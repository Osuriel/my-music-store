import { CardHeader, Card, CardMedia, Typography,CardContent, Box, CardActions, Button, IconButton } from '@mui/material';
import React from 'react';
import { useShoppingCart } from '../context/shoppingCartContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { editFavorites } from '../fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartActionCreator, updateUserFavoritesActionCreator } from '../redux';

const ProductCard = (props) => {
  const {product} = props;
  // const { addItemToCart } =  useShoppingCart();
  const dispatch = useDispatch();
  
  const addItemToCart = (productToAdd) => dispatch(addToCartActionCreator(productToAdd))

  const user = useSelector(state => state.user);

  console.log('user: ', user)
  
  const addToFavorites = () => {
    console.log('user: ', user)
    editFavorites(user.id, [...user.favoriteItems, product.id])
      .then(user => dispatch(updateUserFavoritesActionCreator(user.favoriteItems)))
      .catch(error => {
        console.log('error: ', error);
      })
      
  }
  
  const removefromFavorites = () => editFavorites(user.id, user.favoriteItems.filter(item => item !== product.id))
  .then(user => dispatch(updateUserFavoritesActionCreator(user.favoriteItems)))
  .catch(error => {
    console.log('error: ', error);
  })

  const isItemAUserFavorite = user && user.favoriteItems.includes(product.id);

  console.log();
  return (
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
            () => addItemToCart({ id: product.id, title: product.title, price: product.price, image: product.image})}
            >
              Add to cart
            </Button>
            {isItemAUserFavorite
            ? (
            <IconButton aria-label="add to favorites" onClick={removefromFavorites}>
              <FavoriteIcon style={{fill: "red"}}/>
            </IconButton>
            ) : (
            <IconButton aria-label="add to favorites" onClick={addToFavorites}>
              <FavoriteIcon />
            </IconButton>
            )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard;