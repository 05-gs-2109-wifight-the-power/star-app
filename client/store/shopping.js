import axios from 'axios'

// action types

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const FETCH_CART_STARS = "FETCH_CART_STARS"


// actions

export const _addToCart = (star) => {
 return {
   type: ADD_TO_CART,
   star
 }
}

export const _removeFromCart = (star) => {
  return {
    type: REMOVE_FROM_CART,
    star
  }
}

export const _fetchCartStars = (stars) => {
  return {
    type: FETCH_CART_STARS,
    stars
  }
}

export const addToCart = (star) => {
  return async (dispatch) => {
    try {

      console.log('star in thunk:', star)
      // posting to /orders route
      const {data: added} = await axios.post(`/api/cart`, star)
      dispatch(_addToCart(added))
    } catch (e) {
      console.log('Error: cannot add to cart.')
    }
  }
}


export const removeFromCart = (starId) => {
  return async (dispatch) => {
    try {
      const {data: star} = await axios.delete(`/api/stars/cart/${starId}`)
      dispatch(_removeFromCart(star))
    } catch (e) {
      console.log('Error: cannot delete from cart')
    }
  }
}


export const fetchCartStars = () => {
  return async (dispatch) => {
    try {
      const {data: stars } = await axios.get(`/api/cart`)
      console.log('stars in fetchCartStars thunk:', stars)
      dispatch(_fetchCartStars(stars))
    } catch(e) {
      console.log('Stars not found for this cart')
    }
  }
}

const initialState = {
  stars: []
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, stars: [...state.stars, action.star]}
    case REMOVE_FROM_CART:
      return {
        ...state,
        stars: state.stars.filter((star) => star.id !== action.star.id)
      }
    case FETCH_CART_STARS:
      return action.stars;
    default:
      return state;

  }
}
