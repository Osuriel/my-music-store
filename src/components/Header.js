import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  Link
} from "react-router-dom";
import CartItemCount from './CartItemCount';

const Header = () => {

  const user = useSelector(state => state.user);


  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to="/">
            My Music Store
        </Link>
      </Typography>
      {user ? (
        <Typography component="p" sx={{ flexGrow: 1 }}>
            Hi {user.name}!
      </Typography>
      ) :
      <Link to="login">
        <Button color="inherit">Login</Button>
      </Link>
    }
        <Link to="/cart">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            >
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        <CartItemCount />
    </Toolbar>
  </AppBar>
  )
};

export default Header;