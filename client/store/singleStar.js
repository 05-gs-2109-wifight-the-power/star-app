import axios from "axios";

//action types
const SET_SINGLE_STAR = "SET_SINGLE_STAR";

//action creator
const _setStar = (star) => ({
  type: SET_SINGLE_STAR,
  star,
});

//thunks
export const fetchSingleStar = (starId) => async (dispatch) => {
  console.log(starId);
  try {
    const { data: star } = await axios.get(`/api/stars/${starId}`);
    console.log("THIS IS THE STAR", star);
    dispatch(_setStar(star));
  } catch (e) {
    console.log("Fetch Single Star Error", e);
  }
};

//reducer
const initialState = {};

export default function singleStarReducer(state = initialState, action) {
  console.log(action.star);
  switch (action.type) {
    case SET_SINGLE_STAR:
      return action.star;
    // case UPDATE_STAR:
    //   return action.updatedStar;
    default:
      return state;
  }
}

//Edit userStarName
/* 
const UPDATE_STAR = 'UPDATE_STAR

const updatedStar = (updatedStar) => ({
  type: UPDATE_STAR,
  updatedStar
})

export const updateStarInDb = (id, name) = async (dispatch) => {
  try {
    const {data: updateStar} = await axios.put(`/api/stars/${id}`, {
      id,
      userStarName
    });
  }
  catch(e) {
    console.log('Update Star Error', e)
  }
}

*/
