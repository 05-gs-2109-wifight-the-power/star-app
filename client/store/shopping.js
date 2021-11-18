import axios from "axios";

// action types

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const FETCH_CART_STARS = "FETCH_CART_STARS";

// actions

export const _addToCart = (star) => {
  return {
    type: ADD_TO_CART,
    star,
  };
};

export const _removeFromCart = (star) => {
  return {
    type: REMOVE_FROM_CART,
    star,
  };
};

export const _fetchCartStars = (orders) => {
  return {
    type: FETCH_CART_STARS,
    orders,
  };
};

export const _updateOrder = (bought) => {
  return {
    type: UPDATE_ORDER,
    bought,
  };
};

export const addToCart = (starId, userId, history) => {
  return async (dispatch) => {
    try {
      console.log("star in thunk:", starId);
      console.log("User ID=>>> ", userId);
      // posting to /orders route
      const { data: added } = await axios.get(`/api/cart/${userId}/${starId}`);
      console.log("Added =>> ", added);
      dispatch(_addToCart(added));
      history.push(`/cart/${userId}`);
    } catch (e) {
      console.log("Error: cannot add to cart.", e);
    }
  };
};

export const removeFromCart = (orderId) => {
  return async (dispatch) => {
    try {
      const { data: star } = await axios.delete(`/api/cart/${orderId}`);
      dispatch(_removeFromCart(star));
    } catch (e) {
      console.log("Error: cannot delete from cart");
    }
  };
};

export const fetchCartStars = (userId) => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(`/api/cart/${userId}`);
      console.log("stars in fetchCartStars thunk:", orders);
      dispatch(_fetchCartStars(orders));
    } catch (e) {
      console.log("Stars not found for this cart");
    }
  };
};

// UPDATE /api/cart/:starId
export const updateDb = (orderId, isBought) => async (dispatch) => {
  try {
    const { data: bought } = await axios.put(`/api/cart/${orderId}`, {
      orderId,
      isBought,
    });
    const action = _updateOrder(bought);
    dispatch(action);
  } catch (e) {
    console.log("Update Order Error", e);
  }
};
// const initialState = {
//   stars: [],
//   // orders: [],
// };

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // return { ...state, stars: [...state.stars, action.star] };
      return action.star;
    case REMOVE_FROM_CART:
      return {
        ...state,
        stars: state.stars.filter((star) => star.id !== action.star.id),
      };
    case FETCH_CART_STARS:
      return action.orders;
    case UPDATE_ORDER:
      return action.bought;
    default:
      return state;
  }
}
