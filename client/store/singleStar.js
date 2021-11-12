import axios from "axios";

//action types
const SET_SINGLE_STAR = "SET_SINGLE_STAR";

//action creator
const _setStar = (star) => ({
  type: SET_SINGLE_STAR,
  star,
});

//thunks
export const fetchSingleStar = (id) => async (dispatch) => {
  try {
    const { data: star } = await axios.get(`/api/stars/${id}`);
    dispatch(_setStar(star));
  } catch (e) {
    console.log("Fetch Single Star Error", e);
  }
};

//reducer
const initialState = {};

export default function singleStarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_STAR:
      return action.star;
    default:
      return state;
  }
}
