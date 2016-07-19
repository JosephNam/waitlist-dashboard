import fetch from "isomorphic-fetch"

export const SET_VISUALIZATION_FILTER = "SET_VISUALIZATION_FILTER"
export const FETCH_DATA = "FETCH_DATA"
export const REQUEST_DATA = "REQUEST_DATA"
export const RECEIVE_DATA = "RECEIVE_DATA"

export const VisualizationFilters = {
  BAR_GRAPH: "BAR_GRAPH",
  SCATTER_PLOT: "SCATTER_PLOT",
  GROUPED_BAR_GRAPH: "GROUPED_BAR_GRAPH",
  STACKED_BAR_GRAPH: "STACKED_BAR_GRAPH",
  AREA_GRAPH: "AREA_GRAPH"
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

export function fetchData(url) {
  return (dispatch) => {

    //set state to requesting data 
    dispatch(requestData())

    //send http request that resolves and receives data
    return fetch(url)
      .then(response => response.json())
      .then(json => 
        dispatch(receiveData(json))      
      )
  } 
}
