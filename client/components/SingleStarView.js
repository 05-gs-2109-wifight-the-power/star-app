import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleStar } from "../store/singleStar";

class SingleStar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.id = this.props.match.params.starsId;
  //   console.log("i am props", this.props);
  //   console.log(this.id);
  // }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props);
    this.props.fetchSingleStar(id);
    console.log(fetchSingleStar());
  }

  render() {
    // const { star } = this.props;
    return (
      <div>
        <div>
          <img src={this.props.star.imageUrl} />
          <h5>{this.props.star.name}</h5>
          <h5>Constellation {this.props.star.constellation} </h5>
          <h5>Distance To Earth {this.props.star.distanceFromEarth}</h5>
          <h5>Coordinates {this.props.star.coordinates}</h5>
        </div>
      </div>
    );
  }
}

//extra comma???
const mapState = (state) => ({
  star: state.star,
});

const mapDispatch = (dispatch) => ({
  fetchSingleStar: (id) => dispatch(fetchSingleStar(id)),
});

export default connect(mapState, mapDispatch)(SingleStar);
