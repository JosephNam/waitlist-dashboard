import request from "superagent-es6-promise"

export const FETCH_DATA = "FETCH_DATA"
export const REQUEST_DATA = "REQUEST_DATA"
export const RECEIVE_DATA = "RECEIVE_DATA"

export const SET_DATA_FILTER = "SET_DATA_FILTER"

export const SET_RID = "SET_RID"
export const SET_START_STAMP = "SET_START_STAMP"
export const SET_END_STAMP = "SET_END_STAMP"

export function requestData() {
  // console.log("requesting data")
  return {
    type: REQUEST_DATA
  }
}

export function receiveData(data, filter) {
  return {
    type: RECEIVE_DATA,
    data,
    dataFilter: filter
  }
}

export function fetchData(url, filter) {
  console.log("fetching data", url, filter)
  return (dispatch) => {
    // set state to requesting data
    dispatch(requestData())
    // send http request that resolves and receives data
    return request
      .get(url)
      .query(filter)
      .then((res) => {
        dispatch(receiveData(res.body, filter))
      })
      .catch((err) => console.log(err))
  }
}

export function setDataFilter(dataFilter) {
  console.log(dataFilter)
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
  console.log("start", value)
  return {
    type: SET_START_STAMP,
    startStamp: value
  }
}

export function setEndStamp(value) {
  console.log("end", value)
  return {
    type: SET_END_STAMP,
    endStamp: value
  }
}
