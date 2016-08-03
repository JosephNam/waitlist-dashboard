export const SET_VISUALIZATION_FILTER = "SET_VISUALIZATION_FILTER"
export const FETCH_DATA = "FETCH_DATA"
export const REQUEST_DATA = "REQUEST_DATA"
export const RECEIVE_DATA = "RECEIVE_DATA"

export const VisualizationFilters = {
  SCATTER_PLOT: "SCATTER_PLOT",
  LINE_GRAPH: "LINE_GRAPH",
  BAR_GRAPH: "BAR_GRAPH"
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

