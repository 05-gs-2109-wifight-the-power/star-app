import axios from "axios";

//action types
const SET_SINGLE_STAR = "SET_SINGLE_STAR";
const UPDATE_STAR = "UPDATE_STAR";

//action creator
const _setStar = (star) => ({
  type: SET_SINGLE_STAR,
  star,
});

const updatedStar = (updatedStar) => ({
  type: UPDATE_STAR,
  updatedStar,
});

//thunks
export const fetchSingleStar = (starId) => async (dispatch) => {
  try {
    const { data: star } = await axios.get(`/api/stars/${starId}`);
    dispatch(_setStar(star));
  } catch (e) {
    console.log("Fetch Single Star Error", e);
  }
};

export const updateStarInDb = (id, userStarName) => async (dispatch) => {
  try {
    const { data: updateStar } = await axios.put(`/api/stars/${id}`, {
      id,
      userStarName,
    });
    const action = updatedStar(updateStar);
    dispatch(action);
  } catch (e) {
    console.log("Update Star Error", e);
  }
};

//reducer
const initialState = {};

export default function singleStarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_STAR:
      return action.star;
    case UPDATE_STAR:
      return action.updatedStar;
    default:
      return state;
  }
}
