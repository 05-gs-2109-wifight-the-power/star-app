import axios from 'axios';

//ACTION TYPES
const SET_STARS = 'SET_STARS'

//ACTION CREATORS
const _setStars = stars => ({
  type: SET_STARS,
  stars
})

//THUNKS
export const fetchStars = () => async (dispatch) => {
  try {
    const { data: stars } = await axios.get('/api/stars');
    dispatch(_setStars(stars));
  } catch(e) {
    console.log('Fetch Stars Thunk Error!', e);
  }
};

//REDUCER
const initialState = [];

export default function starsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STARS:
      return action.stars
    default:
      return state
  }
}
