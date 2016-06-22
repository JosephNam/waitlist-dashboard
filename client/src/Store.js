import { createStore } from "redux"
import visualizationApp from "./reducers/VisualizationReducers"

const Store = createStore(visualizationApp)

export default Store
