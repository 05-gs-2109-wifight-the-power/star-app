import React, { Component, useEffect, useState } from "react";
import { removeFromCart, fetchCartStars } from "../store/shopping";
import { connect } from "react-redux";
import { fetchStars } from "../store/stars";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    const userId = this.props.auth.id;
    console.log("userId in DidMount:", userId);
    this.props.fetchCartStars(userId);
    // this.setState({ orders: this.props.cartStars.stars });
    // console.log("current state", this.state);
  }
  render() {
    console.log("Props=>>>", this.props.cartStars[0]);
    const order = this.props.cartStars[0] || [];
    const stars = order.stars || [];
    console.log(stars);
    // const result = this.props.cartStars["0"];
    // const { stars } = result;
    // console.log("RESULT=>>>> ", result);
    // console.log("STARS=>>", stars);

    return (
      <div>
        <div>
          {stars.length < 1 ? (
            <div>
              <h1>GO BACK AND ADD SOMETHING TO CART!!!</h1>
            </div>
          ) : (
            <div>
              {stars.map((star) => (
                <div key={star.id}>
                  <img src={star.imageUrl} />
                  <h2>{star.name}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cartStars: state.cartStars,
  auth: state.auth,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchCartStars: (userId) => dispatch(fetchCartStars(userId, history)),
});

export default connect(mapState, mapDispatch)(Cart);

// /*
//         {/* {console.log("props inside return", this.props.cartStars)}
//         {console.log(
//           "typeof this.props.cartStars[0]",
//           typeof this.props.cartStars[0]
//         )} }*/
//         // {console.log("starId:", typeof this.props.cartStars)}
//         // {this.props.cartStars.length > 0 ? (
//         //   this.props.cartStars.map((star) => (
//         //     <div key={star.id}>
//         //       {console.log("current star", star)}
//         //       <img src={star.imageUrl} />
//         //       <h1>{star.id}</h1>
//         //       {/* <h5>{orderDetails.totalPrice}</h5> */}
//         //     </div>
//         //   ))
//         // ) : (
//         //   <div>{console.log("add to cart")} Add to the cart!!!</div>
//         // )}
// */
