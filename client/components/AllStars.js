import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchStars } from '../store/stars'

class AllStars extends Component {

  componentDidMount() {
    this.props.fetchStars();
    console.log(this.props)
    this.currencyFormat = this.currencyFormat.bind(this);
  }

  currencyFormat(num) {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    return (
      <main className="main-area">
        <section className="cards">
          {this.props.stars.map(star => (

            <article className="card" key={star.id}>
              <a href="">
                <img className="star-img" src={star.imageUrl} />
                <div className="card-content">
                  <h1 className="star-name">{star.name}</h1>
                  <h3 className="star-price">{this.currencyFormat(Number(star.price))}</h3>
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
