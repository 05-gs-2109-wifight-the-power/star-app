import React, { Component } from "react";
import { connect } from "react-redux";

//import actions from reducer (local storage action?)

class CartView extends Component {
  constructor(props) {
    super(props)
    //this.state = [];
  }
}



// import { fetchCartStars, addToCart, removeFromCart } from "../store/shopping"

// class CartView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     // this.props.cartProducts
//     this.props.fetchCartStars();
//   }
//   /*
//   onSubmit: Should be able to
//   addStar to the Order_Details
//   if is favorite or not;
//   change isBought to TRUE
//   destroy that Order by its OrderId, only if isBought is TRUE.
//   */
//   onSubmit(evt) {
//     evt.preventDefault();
//   }

//   render() {

//     const {stars} = this.props;

//     return (
//       <div>
//         <div></div>
//         <h3>Subtotal: {}</h3>
//         <button>CHECKOUT</button>
//       </div>
//     );
//   }
// }

// const mapState = (state) => ({
//   stars: state.stars
// })

// const mapDispatch = ({dispatch}) => ({
//   fetchCartStars: () => dispatch(fetchCartStars()),
//   addToCart: (star) => dispatch(addToCart(star)),
//   removeFromCart: (star) => dispatch(removeFromCart(star))

// })

// export default connect(mapState, mapDispatch)(CartView);
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
