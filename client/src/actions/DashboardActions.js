import request from "superagent-es6-promise"

export const FETCH_DATA = "FETCH_DATA"
export const REQUEST_DATA = "REQUEST_DATA"
export const RECEIVE_DATA = "RECEIVE_DATA"

export const SET_DATA_FILTER = "SET_DATA_FILTER"

export const SET_RID = "SET_RID"
export const SET_START_STAMP = "SET_START_STAMP"
export const SET_END_STAMP = "SET_END_STAMP"

export const SET_SELECTED_ROWS = "SET_SELECTED_ROWS"
export const SET_SELECTED_POINT = "SET_SELECTED_POINT"


export const REQUEST_OVERQUOTED = "REQUEST_OVERQUOTED"
export const RECEIVE_OVERQUOTED = "RECEIVE_OVERQUOTED"


export function requestOverquoted() {
  return {
    type: REQUEST_OVERQUOTED
  }
}

export function receiveOverquoted(overquoted) {
  return {
    type: RECEIVE_OVERQUOTED,
    overquoted
  }
}

export function fetchOverquoted() {
  return (dispatch) => {
    dispatch(requestOverquoted)
    return request
      .get("/overquoted")
      .then((res) => {
        dispatch(receiveOverquoted(res.body))
      })
  }
}

export function requestData(isInitialLoad) {
  return {
    type: REQUEST_DATA,
    isInitialLoad
  }
}

export function receiveData(data, filter, isInitialLoad) {
  return {
    type: RECEIVE_DATA,
    data,
    dataFilter: filter,
    isInitialLoad
  }
}

export function fetchData(url, filter, isInitialLoad) {
  return (dispatch) => {
    // set state to requesting data
    dispatch(requestData(isInitialLoad))
    // send http request that resolves and receives data
    return request
      .get(url)
      .query(filter)
      .set("application/json")
      .then((res) => {
        setTimeout(() => {
          dispatch(receiveData(res.body, filter, isInitialLoad))
          dispatch(fetchOverquoted())
        }
        , 1500)
      })
      .catch((err) => console.log(err))
  }
}

export function setDataFilter(dataFilter) {
  return {
    type: SET_DATA_FILTER,
    dataFilter
  }
}

export function setRID(value) {
  return {
    type: SET_RID,
    rid: value
  }
}

export function setStartStamp(value) {
  return {
    type: SET_START_STAMP,
    startStamp: value
  }
}

export function setEndStamp(value) {
  return {
    type: SET_END_STAMP,
    endStamp: value
  }
}

export function setSelectedRows(selectedRows, oldData) {
  const data = oldData
  // index the selected points in the data set
  for (let i = 0; i < data.length; i++) {
    if (selectedRows.indexOf(i) !== -1) {
      data[i].selected = true
    } else {
      data[i].selected = false
    }
  }

  return {
    type: SET_SELECTED_ROWS,
    selectedRows,
    data
  }
}

export function setSelectedPoint(point, selectedRows, oldData) {
  const data = oldData
  let selectedIndex = -1
  // index the selected points in the data set
  for (let i = 0; i < data.length; i++) {
    if (point.restaurant_id === data[i].restaurant_id
      && point.quoted === data[i].quoted
      && point.estimated === data[i].estimated
      && point.actual === data[i].actual
      && point.timestamp === data[i].timestamp
      && point.selected === data[i].selected) {
      selectedIndex = i
    }
  }
  if (selectedIndex !== -1) {
    const selectedRowIndex = selectedRows.indexOf(selectedIndex)
    if (selectedRowIndex !== -1) {
      // the data is selected
      data[selectedIndex].selected = false
      selectedRows.splice(selectedRowIndex, 1)
    } else {
      data[selectedIndex].selected = true
      selectedRows.push(selectedIndex)
    }
  }
  return {
    type: SET_SELECTED_POINT,
    selectedRows,
    data
  }
}
