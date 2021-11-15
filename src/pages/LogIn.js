import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Layout from '../components/Layout';
import { useShoppingCart } from '../context/shoppingCartContext';
import ReplayIcon from '@mui/icons-material/Replay';
import { logInUser } from '../fetchData';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  
  const [{email, password}, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const onSubmit = () => {
    logInUser(email, password)
      .then(user => dispatch({type: "LOG_IN", payload: {user: user}}))
      .catch(error => {
        console.log('error: ', error);
      })
      
  }

  return (
    <Layout>
       <Box>
        <Box mb={4}>
          <TextField
            id="standard-basic"
            label="email"
            variant="standard"
            value={email}
            onChange={
              (event) => {
                setCredentials({password, email: event.target.value})
              }
            }
          />
        </Box>
        <Box mb={4}>
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            type="password" 
            value={password}
            onChange={
              (event) => {
                setCredentials({email, password: event.target.value})
              }
            }
          />
        </Box>
        <Box>
          <Button onClick={onSubmit}>log in</Button>
        </Box>
       </Box>
    </Layout>
  )
};

export default LoginPage;