import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStarInDb } from "../store/singleStar";
import { addToCart } from '../store/shopping'

class EditStar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  render() {
    return (
      <div>
        {/* decide on placement */}
        <h5>${this.props.star.price}</h5>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userStarName">${this.props.star.price}</label>
          <input
            name="newStarName"
            type="text"
            value={this.state.starName}
            onChange={this.handleChange}
            placeholder="Your Star Name"
          />
          {/* can be changed to img when we decide on add to favorites image */}
          <button>pretend this is a star image</button>
          <br />
          <button type="submit" onClick = {() => this.props.addToCart(this.props.star)}>Add To Cart</button>
        </form>

      </div>
    );
  }
}

const mapState = (state) => ({
  star: state.star,
});

const mapDispatch = (dispatch) => ({
  updateUserStarName: (id, updateStarName) =>
    dispatch(updateStarInDb(id, updateStarName)),
  addToCart: (star) => dispatch(addToCart(star))
});

export default connect(mapState, mapDispatch)(EditStar);
