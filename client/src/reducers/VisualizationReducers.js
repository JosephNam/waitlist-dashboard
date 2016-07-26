import { Map } from "immutable"
import { SET_VISUALIZATION_FILTER, VisualizationFilters,
  REQUEST_DATA, RECEIVE_DATA
} from "../actions/VisualizationActions"

const initialState = new Map({
  visualizationFilter: VisualizationFilters.BAR_GRAPH
})

export default function visualization(state = initialState, action) {
  switch (action.type) {
    case SET_VISUALIZATION_FILTER:
      return state.set("visualizationFilter", action.filter)
    case RECEIVE_DATA:
      return state.set("data", action.data)
        .set("isLoadingData", false)
        .set("dataFilter", action.dataFilter)
    case REQUEST_DATA:
      return state.set("isLoadingData", true)
    default:
      return state
  }
}
