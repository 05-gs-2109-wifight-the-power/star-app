import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import starsReducer from "./stars";
import singleStarReducer from "./singleStar";
import cartReducer from "./shopping";

const reducer = combineReducers({
  auth,
  stars: starsReducer,
  star: singleStarReducer,
  cartStars: cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
