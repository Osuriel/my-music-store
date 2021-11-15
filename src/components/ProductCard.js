import { CardHeader, Card, CardMedia, Typography,CardContent, Box, CardActions, Button, IconButton } from '@mui/material';
import React from 'react';
import { useShoppingCart } from '../context/shoppingCartContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { editFavorites } from '../fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFavoritesActionCreator } from '../redux';

const ProductCard = (props) => {
  const {product} = props;
  const { addItemToCart } =  useShoppingCart();

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  

  // const addToFavorites = () => editFavorites (user.id, [...user.favoriteItems, product.id])
  // .then(user => {
  //   console.log('updatedUser: ', user)
  //   dispatch({
  //     type: 'mymusicstore.com/UPDATE_USER_FAVORITES',
  //     payload: { favoriteItems: ["234"] }
  //   });
  // })

  const addToFavorites = () => {
    dispatch({
      type: 'mymusicstore.com/UPDATE_USER_FAVORITES',
      payload: { favoriteItems: ["234"] }
    });
  };

  console.log('user: ', user)
  
  const onSubmit = () => {
    console.log('user: ', user)
    editFavorites(user.id, [...user.favoriteItems, product.id])
      .then(user => dispatch(updateUserFavoritesActionCreator(user)))
      .catch(error => {
        console.log('error: ', error);
        // setError(error.message)
      })
      
  }
  
  const removeToFavorites = () => editFavorites (user.id, user.favoriteItems.filter(item => item !== product.id))
  .then(user => console.log('updatedUser: ', user))

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
          <IconButton aria-label="add to favorites" onClick={onSubmit}>
            <FavoriteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard;