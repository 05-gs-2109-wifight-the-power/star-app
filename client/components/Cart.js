import React, { Component } from "react";
import { fetchCartStars, updateDb } from "../store/shopping";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const userId = this.props.auth.id;
    console.log("userId in DidMount:", userId);
    this.props.fetchCartStars(userId);
    // this.setState({ orders: this.props.cartStars.stars });
    // console.log("current state", this.state);
  }
  handleUpdate(order) {
    order.isBought = true;
    console.log(order.isBought);
    this.props.updateDb(order.id, order.isBought);
  }

  render() {
    console.log("Props=>>>", this.props.cartStars[0]);
    const order = this.props.cartStars[0] || [];
    const stars = order.stars || [];
    const orderDetails = order.Order_Details || [];
    const subTotal = [];
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
                  <img src={star.imageUrl} width="200px" />
                  <h2>{star.name}</h2>
                  <h3>{star.userStarName}</h3>
                  <p>{star.bio}</p>
                  {subTotal.push(star.price)}
                </div>
              ))}
              <div>SubTotal: ${subTotal.reduce((prev, val) => prev + val)}</div>
              <div>
                <Link to="/thanks">
                  <button onClick={() => this.handleUpdate(order)}>
                    CHECKOUT
                  </button>
                </Link>
              </div>
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
  updateDb: (orderId, isBought) =>
    dispatch(updateDb(orderId, isBought, history)),
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
