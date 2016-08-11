/* global window: true */
import request from "superagent-es6-promise"
import _ from "lodash"
import { Map } from "immutable"

export const REQUEST_DATA = "REQUEST_DATA"
export const RECEIVE_DATA = "RECEIVE_DATA"
export const FETCH_DATA = "FETCH_DATA"

export const SET_DATA_FILTER = "SET_DATA_FILTER"

export const SET_RID = "SET_RID"
export const SET_START_STAMP = "SET_START_STAMP"
export const SET_END_STAMP = "SET_END_STAMP"

export const SET_SELECTED_ROWS = "SET_SELECTED_ROWS"
export const SET_SELECTED_POINT = "SET_SELECTED_POINT"

export const SET_PARTY_SIZES = "SET_PARTY_SIZES"

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

export function receiveData(data, filter, isInitialLoad, start, end) {
  const selectedStructure = {}
  return {
    type: RECEIVE_DATA,
    data,
    dataFilter: filter,
    isInitialLoad,
    selectedStructure,
    start,
    end
  }
}

export function fetchData(url,
  filter,
  partySizes,
  isInitialLoad) {
  return (dispatch) => {
    // set state to requesting data
    dispatch(requestData(isInitialLoad))
    // send http request that resolves and receives data
    const dataFilters = _.cloneDeep(filter)
    dataFilters.party_sizes = partySizes
    return request
      .get(url)
      .query(dataFilters)
      .set("application/json")
      .then((res) => {
        setTimeout(() => {
          console.log(res.body)
          dispatch(receiveData(res.body, filter, isInitialLoad, filter.startstamp, filter.endstamp))
          dispatch(fetchOverquoted())
        }
        , 1500)
      })
      .catch((err) => console.log(err))
  }
}

export function setPartySizes(partySizes) {
  return {
    type: SET_PARTY_SIZES,
    partySizes
  }
}

// fetchData wrapper to set party size and still retrieve data
export function reload(partySizes, filter) {
  return (dispatch) => {
    dispatch(setPartySizes(partySizes))
    dispatch(fetchData("/estimates", filter, partySizes, false))
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

/*
export function setSelectedRows(selectedRows, oldData) {
  const data = oldData
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
*/

const initialState = new Map({
  dataFilter: {
  },
  party_sizes: [0, 1, 2, 3, 4, 5, 6],
  isInitialLoad: true,
  isLoadingData: true,
  startStamp: 0,
  endStamp: new Date().valueOf(),
  data: [],
  rid: -1,
  selectedRows: [],
  overquoted: 0,
  windowWidth: window.innerWidth,
  start: 0,
  end: 10,
  selectedStructure: {}
})

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_FILTER:
      return state.set("dataFilter", action.dataFilter)
    case RECEIVE_DATA: {
      if (action.isInitialLoad) {
        return state.set("isInitialLoad", false)
          .set("data", action.data)
          .set("isLoadingData", false)
          .set("start", action.start)
          .set("end", action.end)
          .set("selectedStructure", action.selectedStructure)
      }
      return state.set("data", action.data)
        .set("isLoadingData", false)
    }
    case REQUEST_DATA: {
      if (action.isInitialLoad) {
        return state.set("isInitialLoad", true)
      }
      return state.set("isLoadingData", true).set("isInitialLoad", false)
    }
    case SET_RID:
      return state.set("rid", action.rid)
    case SET_START_STAMP:
      return state.set("startStamp", action.startStamp)
    case SET_END_STAMP:
      return state.set("endStamp", action.endStamp)
    case SET_SELECTED_ROWS: {
      const tempMap = state.set("selectedRows", action.selectedRows.slice(0))
      return tempMap.set("data", action.data)
    }
    case SET_SELECTED_POINT: {
      const tempMap = state.set("selectedRows", action.selectedRows.slice(0))
      return tempMap.set("data", action.data)
    }
    case RECEIVE_OVERQUOTED:
      return state.set("overquoted", action.overquoted)
    case SET_PARTY_SIZES: {
      return state.set("party_sizes", action.partySizes)
    }
    default:
      return state
  }
}
