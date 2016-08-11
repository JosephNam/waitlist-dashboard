/* @flow */
/* global document: true */
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin"
import Dashboard from "./dashboard/DashboardComponent"
import Store from "./Store"

injectTapEventPlugin()

ReactDOM.render(
  <Provider store={Store}>
    <MuiThemeProvider>
      <Dashboard />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("content"))
