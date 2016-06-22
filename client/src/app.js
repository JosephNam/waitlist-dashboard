/* @flow */
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Dashboard from "./components/Dashboard"
import Store from "./Store"

// import { List, Map } from "immutable"


/* let dummydata = new List([
  new Map({
    name: "predicted",
    x: 1,
    y: 86
  }),
  new Map({
    name: "host",
    x: 2,
    y: 48
  }),
  new Map({
    name: "suggested",
    x: 3,
    y: 60
  }),
  new Map({
    name: "projected",
    x: 4,
    y: 70
  }),
  new Map({
    name: "expiremental",
    x: 5,
    y: 68
  }),
  new Map({
    name: "expiremental algo 2",
    x: 6,
    y: 65
  })
])
*/

ReactDOM.render(
  <Provider store={Store}>
    <Dashboard />
  </Provider>,
  document.getElementById("content"))

