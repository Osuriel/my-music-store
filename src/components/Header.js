import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

import {
  Link
} from "react-router-dom";

const Header = () => {

  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to="/">
            My Music Store
        </Link>
      </Typography>
        <Button color="inherit">Login</Button>
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
    </Toolbar>
  </AppBar>
  )
};

export default Header;