import axios from "axios";

export const editFavorites = async (userId, favorites) => {

  console.log('fetching Data from imaginary products database')
  try {
      const response = await axios.post('http://localhost:3020/edit-user-favorites', {userId, favorites})
      return response.data;

  } catch (error) {
      console.log(error);
  }
};


export const logInUser = async (email, password) => {
  console.log('made it to log in user')

  try {
    const response = await axios.post('http://localhost:3020/log-in', { email, password });
    console.log('response: ', response)
    return response.data;
  } catch(error){
    console.log('error: ', error)
  }
};

export const registerUser = async (form) => {
  try {
    const response = await axios.post('http://localhost:3020/register-user', form);
    const registeredUser = response.data;
    return registeredUser;
  } catch(error){
    console.log('error: ', error)
  }
};

export const fetchProducts = () =>
  axios.get('http://localhost:3020/product-list')
  .then(response => {
    console.log('response: ', response);

    return response.data;
  })
  .catch(error => console.log('error: ', error))

  