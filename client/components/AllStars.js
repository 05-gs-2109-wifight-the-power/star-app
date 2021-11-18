import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStars } from "../store/stars";
import { addToCart } from "../store/shopping";
import { Login } from "./AuthForm";

class AllStars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rememberMe: false,
      stars: []
    }
    this.handleCart = this.handleCart.bind(this);
    //this.handleGuestCart = this.handleGuestCart.bind(this);
  }
  componentDidMount() {
    this.props.fetchStars();
    console.log("Props on DidMount", this.props);
    this.currencyFormat = this.currencyFormat.bind(this);

    const stars = JSON.parse(localStorage.getItem('stars')) || []
    const rememberMe = localStorage.getItem('rememberMe')=== 'true';
    this.setState({stars, rememberMe})
  }

  currencyFormat(num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  handleCart(starId) {
    let userId = this.props.userId;
    this.props.addToCart(starId, userId);
  }

  handleGuestCart(starId) {
    this.state.stars.push(starId)
    localStorage.setItem('stars', JSON.stringify(this.state.stars));
    localStorage.setItem('rememberMe', 'true')
    console.log('stars:', this.state.stars)
   }

  render() {
    console.log("Props on render =>", this.props);



    const { isLoggedIn } = this.props;

    console.log('isLoggedIn?', isLoggedIn)

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
                  onClick={() =>

                  isLoggedIn ?
                  this.handleCart(star.id)
                  :
                  this.handleGuestCart(star)
                  }
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
  isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchStars: () => dispatch(fetchStars()),
  addToCart: (starId, userId) => dispatch(addToCart(starId, userId, history)),
});

export default connect(mapState, mapDispatch)(AllStars);
