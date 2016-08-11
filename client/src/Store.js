import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import visualization from "./ducks/visualization"
import dashboard from "./ducks/dashboard"

const Store = createStore(
  combineReducers({
    visualization,
    dashboard
  }),
  applyMiddleware(thunk)
)
export default Store
