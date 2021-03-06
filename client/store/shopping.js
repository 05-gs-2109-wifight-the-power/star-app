import axios from "axios";

// action types

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const UPDATE_AVAILABLE = "UPDATE_AVAILABLE";
export const FETCH_CART_STARS = "FETCH_CART_STARS";

// actions

export const _addToCart = (star) => {
  return {
    type: ADD_TO_CART,
    star,
  };
};

export const _removeFromCart = (orderDestroyed) => {
  return {
    type: REMOVE_FROM_CART,
    orderDestroyed,
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

export const _updateAvailable = (soldOut) => {
  return {
    type: UPDATE_AVAILABLE,
    soldOut,
  };
};

// -------THUNK CREATOR ------------------
export const addToCart = (starId, userId, history) => {
  return async (dispatch) => {
    try {
      const { data: added } = await axios.get(`/api/cart/${userId}/${starId}`);
      dispatch(_addToCart(added));
      history.push(`/cart/${userId}`);
    } catch (e) {
      console.log("Error: cannot add to cart.", e);
    }
  };
};

export const removeFromCart = (orderId, starId) => {
  return async (dispatch) => {
    try {
      const { data: orderDestroyed } = await axios.delete(
        `/api/cart/${orderId}/${starId}`
      );
      dispatch(_removeFromCart(orderDestroyed));
    } catch (e) {
      console.log("Error: cannot delete from cart");
    }
  };
};

export const fetchCartStars = (userId) => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(`/api/cart/${userId}`);
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

export const updateStar = (starId, isAvailable) => async (dispatch) => {
  try {
    const { data: soldOut } = await axios.put(`/api/stars/${starId}`, {
      starId,
      isAvailable,
    });
    const action = _updateAvailable(soldOut);
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
      return action.orderDestroyed;
    // {
    //   ...state,
    //   stars: state.stars.filter((star) => star.id !== action.star.id),
    // };
    case FETCH_CART_STARS:
      return action.orders;
    case UPDATE_ORDER:
      return action.bought;
    case UPDATE_AVAILABLE:
      return action.soldOut;
    default:
      return state;
  }
}
