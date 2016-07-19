import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import visualizationApp from "./reducers/VisualizationReducers"

const Store = createStore(visualizationApp, applyMiddleware(thunk))

export default Store
