import React, { Component } from "react";
import { connect } from "react-redux";

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.cartProducts
  }
  /*
  onSubmit: Should be able to 
  addStar to the Order_Details
  if is favorite or not;
  change isBought to TRUE
  destroy that Order by its OrderId, only if isBought is TRUE.
  */
  onSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <div></div>
        <h3>Subtotal: {}</h3>
        <button>CHECKOUT</button>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(CartView);
/**
 const GET_ORDERS = "GET_ORDERS"

 const get_orders(orders) => {
   return {
     type: GET_ORDERS,
     orders
   }
 }

 const initialState = {
   stars: [{...}, {...}],
   star: {}
   cart: [{..}, {..}]
 }
 
 export const _get_robots = (cartId, history) => {
   return async (dispatch) => {
     try {
       const {data} = await axios.get('/api/)
     }
   }
 }


 */
