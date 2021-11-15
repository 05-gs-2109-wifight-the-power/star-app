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
      <main class="main-area">
        <section class="cards">
          {this.props.stars.map(star => (

            <article class="card" key={star.id}>
              <a href="">
                <img class="star-img" src={star.imageUrl} />
                <div class="card-content">
                  <h1 class="star-name">{star.name}</h1>
                  <h3 class="star-price">{star.price}</h3>
                </div>
              </a>
            </article>
          ))}
        </section>
      </main>
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
