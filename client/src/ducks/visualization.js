import { Map } from "immutable"

export const SET_VISUALIZATION_FILTER = "SET_VISUALIZATION_FILTER"
export const FETCH_DATA = "FETCH_DATA"
export const REQUEST_DATA = "REQUEST_DATA"
export const RECEIVE_DATA = "RECEIVE_DATA"

export const VisualizationFilters = {
  SCATTER_PLOT: {
    title: "Scatter Plot",
    plotly_type: "scattergl",
    mode: "markers"
  },
  LINE_GRAPH: {
    title: "Line Graph",
    plotly_type: "lines",
    mode: "lines"
  },
  BAR_GRAPH: {
    title: "Bar Graph",
    plotly_type: "bar"
  }
}

export function setVisualizationFilter(filter) {
  return {
    type: SET_VISUALIZATION_FILTER,
    filter
  }
}

export function requestData() {
  return {
    type: REQUEST_DATA
  }
}

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data
  }
}
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
