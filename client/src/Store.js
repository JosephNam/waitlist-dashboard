import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import visualization from "./reducers/VisualizationReducers"
import dashboard from "./reducers/DashboardReducer"

const Store = createStore(
  combineReducers({
    visualization,
    dashboard
  }),
  applyMiddleware(thunk)
)
export default Store
