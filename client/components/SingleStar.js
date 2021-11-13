import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleStar } from "../store/singleStar";

export class SingleStar extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.starsId;
  }
  componentDidMount() {
    this.props.fetchSingleStar(this.id);
  }

  render() {
    const { star } = this.props;
    console.log("Single star", star);
    return (
      <div>
        <div>
          <img src={star.imageUrl} />
          <h5>{star.name}</h5>
          <h5>Constellation {star.constellation} </h5>
          <h5>Distance To Earth {star.distanceFromEarth}</h5>
          <h5>Coordinates {star.coordinates}</h5>
        </div>
      </div>
    );
  }
}

//extra comma???
const mapState = ({ star }) => ({
  star,
});

const mapDispatch = (dispatch) => ({
  fetchSingleStar: (id) => dispatch(fetchSingleStar(id)),
});

export default connect(mapState, mapDispatch)(SingleStar);
