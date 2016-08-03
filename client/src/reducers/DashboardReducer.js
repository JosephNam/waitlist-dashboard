/* global window: true*/
import { Map } from "immutable"
import {
  REQUEST_DATA, RECEIVE_DATA,
  SET_DATA_FILTER, SET_END_STAMP,
  SET_START_STAMP, SET_RID,
  SET_SELECTED_ROWS, SET_SELECTED_POINT,
  RECEIVE_OVERQUOTED, SET_PARTY_SIZES
} from "../actions/DashboardActions"

const initialState = new Map({
  dataFilter: {
  },
  party_sizes: [1, 2, 3, 4, 5, 6],
  isInitialLoad: true,
  isLoadingData: true,
  data: [],
  rid: 0,
  startStamp: 0,
  endStamp: 0,
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
