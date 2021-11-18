import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStarInDb } from "../store/singleStar";
import { addToCart } from "../store/shopping";

class EditStar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  // componentDidMount() {}

  handleChange(e) {
    this.setState({
      starName: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateUserStarName(this.props.star.id, this.state.starName);
    this.setState({
      starName: "",
    });
  }

  handleCart(starId) {
    this.props.addToCart(starId, this.props.userId);
    console.log("star id", starId);
    console.log("user id", this.props.userId);
  }

  render() {
    console.log("props", this.props);
    const star = this.props.star || [];
    return (
      <div className="edit-star-wrapper">
        {/* decide on placement */}
        {/* <h5>${this.props.star.price}</h5> */}
        <form onSubmit={this.handleSubmit}>
          <label className="star-price" htmlFor="userStarName">
            ${this.props.star.price}
          </label>
          <input
            className="rename-star"
            name="newStarName"
            type="text"
            value={this.state.starName}
            onChange={this.handleChange}
            placeholder="Your Star Name"
          />
          {/* can be changed to img when we decide on add to favorites image */}
          {/* <button>pretend this is a star image</button> */}
          <br />
        </form>
        <button
          className="cart-button"
          type="submit"
          onClick={() => this.handleCart(star.id)}
        >
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  star: state.star,
  userId: state.auth.id,
});

const mapDispatch = (dispatch, { history }) => ({
  updateUserStarName: (id, updateStarName) =>
    dispatch(updateStarInDb(id, updateStarName)),
  addToCart: (starId, userId) => dispatch(addToCart(starId, userId, history)),
});

export default connect(mapState, mapDispatch)(EditStar);
