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
      <div className="single-star-wrapper">
          <div className="single-star-details">
            <img className="single-star-img" src={star.imageUrl} />
            <h5 className="star-name">{star.name}</h5>
            <div className="single-star-description">
                <div className="label-wrapper">
                    <p className="label">Constellation</p>
                    <p className="label">Distance To Earth</p>
                    <p className="label">Coordinates</p>
                </div>
                <div className="detail-wrapper">
                    <h5 className="detail">{star.constellation}</h5>
                    <h5 className="detail">{star.distanceFromEarth}</h5>
                    <h5 className="detail">{star.coordinates}</h5>
                </div>
            </div>
          </div>
            <EditStar />
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
