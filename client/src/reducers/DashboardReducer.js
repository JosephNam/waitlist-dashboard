import { Map } from "immutable"
import {
  REQUEST_DATA, RECEIVE_DATA,
  SET_DATA_FILTER, SET_END_STAMP,
  SET_START_STAMP, SET_RID
} from "../actions/DashboardActions"

const initialState = new Map({
  dataFilter: {},
  isLoadingData: false,
  data: [],
  rid: 0,
  startStamp: 0,
  endStamp: 0
})

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case SET_DATA_FILTER:
      return state.set("dataFilter", action.dataFilter)
    case RECEIVE_DATA:
      return state.set("data", action.data)
        .set("isLoadingData", false)
    case REQUEST_DATA:
      return state.set("isLoadingData", true)
    case SET_RID:
      return state.set("rid", action.rid)
    case SET_START_STAMP:
      return state.set("startStamp", action.startStamp)
    case SET_END_STAMP:
      return state.set("endStamp", action.endStamp)
    default:
      return state
  }
}
