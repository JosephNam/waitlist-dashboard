/* @flow */
import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import Dashboard from "./components/Dashboard.jsx"

let data = [
  {
    name: "predicted",
    value: 98
  },
  {
    name: "host",
    value: 48
  },
  {
    name: "suggested",
    value: 60
  }
]

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Dashboard data={data} elementName="chart" />
    )
  }
}

ReactDOM.render(<App />, document.getElementById("content"))
