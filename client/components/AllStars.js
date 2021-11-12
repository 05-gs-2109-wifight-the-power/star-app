import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchStars } from '../store/stars'

class AllStars extends Component {

  componentDidMount() {
    this.props.fetchStars();
    console.log(this.props)
  }

  render() {
    return (
      <div>
        {this.props.stars.map(star => (
          <div key={star.id}>
            <img src={star.imageUrl} />
            <h1>{star.name}</h1>
            <h5>{star.price}</h5>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => ({
  stars: state.stars
})

const mapDispatch = (dispatch) => ({
  fetchStars: () => dispatch(fetchStars())
})

export default connect(mapState, mapDispatch)(AllStars);
