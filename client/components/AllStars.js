import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStars } from "../store/stars";
import { addToCart } from "../store/shopping";

class AllStars extends Component {
  constructor(props) {
    super(props);

    this.handleCart = this.handleCart.bind(this);
  }
  componentDidMount() {
    this.props.fetchStars();
    console.log("Props on DidMount", this.props);
    this.currencyFormat = this.currencyFormat.bind(this);
  }

  currencyFormat(num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  handleCart(starId) {
    let userId = this.props.userId;
    this.props.addToCart(starId, userId);
  }

  render() {
    console.log("Props on render =>", this.props);
    return (
      <main className="main-area">
        <section className="cards">
          {this.props.stars.map((star) => (
            <article className="card" key={star.id}>
              <Link to={`stars/${star.id}`}>
                <img className="star-img" src={star.imageUrl} />
                <div className="card-content">
                  <div className="card-text">
                    <h1 className="star-name">{star.name}</h1>
                    <h3 className="star-price">
                      {this.currencyFormat(Number(star.price))}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className="add-cart-bttn-wrapper">
                <button
                  className="add-cart-bttn"
                  type="submit"
                  onClick={() => this.handleCart(star.id)}
                >
                  Add To Cart
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  }
}

const mapState = (state) => ({
  stars: state.stars,
  userId: state.auth.id,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchStars: () => dispatch(fetchStars()),
  addToCart: (starId, userId) => dispatch(addToCart(starId, userId, history)),
});

export default connect(mapState, mapDispatch)(AllStars);
