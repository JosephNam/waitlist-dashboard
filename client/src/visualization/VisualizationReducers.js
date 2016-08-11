import { Map } from "immutable"
import { SET_VISUALIZATION_FILTER, VisualizationFilters
} from "./VisualizationActions"

const initialState = new Map({
  visualizationFilter: VisualizationFilters.SCATTER_PLOT
})

export default function visualization(state = initialState, action) {
  switch (action.type) {
    case SET_VISUALIZATION_FILTER:
      return state.set("visualizationFilter", action.filter)
    default:
      return state
  }
}
