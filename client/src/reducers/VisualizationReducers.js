import { Map } from "immutable"
import { SET_VISUALIZATION_FILTER, VisualizationFilters } from "../actions/VisualizationActions"

const initialState = new Map({
  visualizationFilter: VisualizationFilters.BAR_GRAPH
})

export default function visualizationApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISUALIZATION_FILTER:
      return new Map({
        visualizationFilter: action.filter
      })
    default:
      console.log("hello")
      return state
  }
}
