/* @flow */
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import DashboardContainer from "./containers/DashboardContainer"
import Store from "./Store"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin()

ReactDOM.render(
  <Provider store={Store}>
    <MuiThemeProvider>
      <DashboardContainer />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("content"))
