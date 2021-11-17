import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleStar } from "../store/singleStar";
import EditStar from "./EditStar";

class SingleStar extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.match.url);
    this.props.fetchSingleStar(id);
  }

  render() {
    const { star } = this.props;
    return (
      <div>
        <div>
          <img src={star.imageUrl} />
          <h5>{star.name}</h5>
          <h5>Constellation {star.constellation} </h5>
          <h5>Distance To Earth {star.distanceFromEarth}</h5>
          <h5>Coordinates {star.coordinates}</h5>
        </div>
        <div>
          <EditStar />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  star: state.star,
});

const mapDispatch = (dispatch) => ({
  fetchSingleStar: (id) => dispatch(fetchSingleStar(id)),
});

export default connect(mapState, mapDispatch)(SingleStar);
