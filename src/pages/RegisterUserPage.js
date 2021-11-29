import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { registerUser } from '../fetchData';
import { LOG_IN_ACTION } from '../redux/userState';

const Form = (props) => {
  const { setError } = props;

  const [form, setForm] = useState({ name: '', lastName: '', email: '', password: '' });

  const dispatch = useDispatch();


  const onSubmit = async () => {

    try {
      const registeredUser = await registerUser(form);
      
      dispatch({type: LOG_IN_ACTION, payload: {user: registeredUser}});
    } catch (error){
      setError(error)
    }
  }
  
  return (
    <Box>
        <Box mb={4}>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={form.name}
            onChange={
              (event) => {
                setForm({...form, name: event.target.value})
              }
            }
          />
        </Box>
        <Box mb={4}>
          <TextField
            id="standard-basic"
            label="Last Name"
            variant="standard"
            value={form.lastName}
            onChange={
              (event) => {
                setForm({...form, lastName: event.target.value})
              }
            }
          />
        </Box>
        <Box mb={4}>
          <TextField
            id="standard-basic"
            label="email"
            variant="standard"
            value={form.email}
            onChange={
              (event) => {
                setForm({...form, email: event.target.value})
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
            value={form.password}
            onChange={
              (event) => {
                setForm({...form, password: event.target.value})
              }
            }
          />
        </Box>
        <Box>
          <Button onClick={onSubmit}>Register</Button>
        </Box>
       </Box>
  )
}



const RegisterUserPage = () => {
  const [error, setError] = useState();
  const user = useSelector(state => state.user);

  return (
    <Layout>
      {error}
       {user ? `Welcome back ${user.name}!` : <Form setError={setError} />}
    </Layout>
  )
};

export default RegisterUserPage;