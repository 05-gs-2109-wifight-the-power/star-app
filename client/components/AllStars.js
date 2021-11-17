import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStars } from '../store/stars'
import { addToCart } from '../store/shopping'

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
              <Link to={`stars/${star.id}`}>
                <img className="star-img" src={star.imageUrl} />
                <div className="card-content">
                  <div className="card-text">
                      <h1 className="star-name">{star.name}</h1>
                      <h3 className="star-price">{this.currencyFormat(Number(star.price))}</h3>
                  </div>
                  <div className="add-cart-bttn-wrapper">
                      <button className="add-cart-bttn" type="submit" onClick = {() => this.props.addToCart(star)}>Add To Cart</button>
                  </div>
                </div>
              </Link>
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
  fetchStars: () => dispatch(fetchStars()),
  addToCart: (star) => dispatch(addToCart(star))
})

export default connect(mapState, mapDispatch)(AllStars);
