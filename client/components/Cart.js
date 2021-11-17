import React, { Component, useEffect, useState } from "react";
import { removeFromCart, fetchCartStars } from "../store/shopping";
import { connect } from "react-redux";
import { fetchStars } from "../store/stars";

class Cart extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   cartStars: []
    // }
  }

  componentDidMount() {
    this.props.fetchCartStars();

    console.log("current state", this.state);
  }
  render() {
    console.log("what are my props? ", this.props.cartStars);
    console.log("state?", this.state);

    return (
      <div>
        {console.log("props inside return", this.props.cartStars)}
        {console.log(
          "typeof this.props.cartStars[0]",
          typeof this.props.cartStars[0]
        )}
        {console.log("starId:", typeof this.props.cartStars)}
        {this.props.cartStars.length > 0 ? (
          this.props.cartStars.map((star) => (
            <div key={star.id}>
              {console.log("current star", star)}
              <img src={star.imageUrl} />
              <h1>{star.starId}</h1>
              <h5>{star.totalPrice}</h5>
            </div>
          ))
        ) : (
          <div>{console.log("add to cart")} Add to the cart!!!</div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  cartStars: state.cartStars,
});

const mapDispatch = (dispatch) => ({
  fetchCartStars: () => dispatch(fetchCartStars()),
});

export default connect(mapState, mapDispatch)(Cart);

// const CartApp = () => {

//   const getStars = fetchCartStars()

//   let [cart, setCart] = useState([])

//   let myCart = localStorage.getItem("cart");

//   const addStar = (star) => {
//     // copy cart state so existing state is not overwritten
//     let cartCopy = [...cart];

//     let {id} = star;

//     // search cart array for star

//     let isStarInCart = cartCopy.find(star => star.id === id);

//     // if star is already in cart
//     if (isStarInCart) {
//       console.log('already in cart')
//     } else {
//       cartCopy.push(star)
//     }

//     //update state
//     setCart(cartCopy)

//     // store string of cart in local storage
//     let storeCart = JSON.stringify(cartCopy);
//     localStorage.setItem("cart", storeCart)
//   };

//   const updateStar = (starId, nickname) => {

//     // add nickname here (to be completed upon purchase)
//   };
//   const removeStar = (starId) => {
//     let cartCopy = [...cart]
//     cartCopy = cartCopy.filter(star => star.id !== starId);

//     setCart(cartCopy);
//     let storeCart = JSON.stringify(cartCopy)
//     localStorage.setItem('cart', storeCart)
//   };

//   // useEffect is a hook that can run as a functional component version of componentDidMount or componentWillMount

//   // if user refreshes page, the cart needs to be loaded inside localStorage, if it exists, to restore it to the app's state
//   useEffect(() => {

//     myCart = JSON.parse(myCart)

//     if(myCart) setCart(myCart)
//     // empty array means useEffect only runs once
//   }, [])

//   return <div>
//     <h1>This is the cart page</h1>
//     {getStars()}
//   </div>
// }

// export default CartApp
