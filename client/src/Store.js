import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import visualization from "./visualization/VisualizationReducers"
import dashboard from "./dashboard/DashboardReducer"

const Store = createStore(
  combineReducers({
    visualization,
    dashboard
  }),
  applyMiddleware(thunk)
)
export default Store
