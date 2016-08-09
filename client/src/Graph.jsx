/* global Plotly: true */
/* global window: true */
import React from "react"
import request from "superagent-es6-promise"
import _ from "lodash"

function getData() {
  return new Promise((fulfill, reject) => {
    request.get("/estimates")
      .query({
        startstamp: 0,
        endstamp: new Date().valueOf(),
        party_sizes: [0, 1, 2, 3, 4, 5, 6]
      })
      .set("application/json")
      .then((res) => {
        console.log(res)
        fulfill(res.body)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export default class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    getData().then((data) => {
      this.setState({ data })
      console.log(this.state.data)
    })
  }

  render() {
    if (!this.state.data) return <div id="visualization" />
    const data = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: []
    }
    _.forEach(this.state.data, (datum) => data[`${datum.party_size}`].push(datum))
    const traces = []
    _.forEach(data, (list, i) => {
      const x = _.map(list, (datum) => (datum.timestamp))
      const y = _.map(list, (datum) => (datum.actual))
      const size = _.map(list, (datum) => (datum.size + 5))
      const plt = {
        name: `Party Size ${i}`,
        x,
        y,
        mode: "markers",
        type: "scattergl",
        marker: {
          size
        }
      }
      traces.push(plt)
    })
    const layout = {
      xaxis: {
        type: "date",
        title: "Date"
      },
      yaxis: {
        title: "Actual Wait Time"
      },
      width: (window.innerWidth / 12) * 8,
      height: 600
    }
    Plotly.newPlot("visualization", traces, layout)
    return (
      <div id="visualization" />
    )
  }
}
