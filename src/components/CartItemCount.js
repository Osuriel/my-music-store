import { Box } from '@mui/system';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { EMPTY_CART_ACTION } from '../redux/shoppingCartState';

class CartItemCount extends React.Component {

  handleEmptyCart = () => {
    console.log('THis should empty the car')
    this.props.emptyCart();
  };
  
  render(){
    const { shoppingCart } = this.props;
    return <Box>
      <div>ItemCount: {shoppingCart.length}</div>
      <button onClick={() => this.handleEmptyCart()}>Empty cart</button>
    </Box>
  }
}

const mapStateToProps = (state) => {

  return {
    shoppingCart: state.shoppingCart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    emptyCart: () => dispatch({type: EMPTY_CART_ACTION }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemCount);