/* global Plotly: true */
/* global window: true */
import React, { PropTypes } from "react"
import _ from "lodash"

export default class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.layout = {
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
    this.traces = []
    _.forEach(this.props.data, (list, i) => {
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
      this.traces.push(plt)
    })
  }

  componentDidMount() {
    Plotly.newPlot("visualization", this.traces)
  }

  componentWillReceiveProps(np) {
    this.setState({
      data: np.data
    })
  }

  shouldComponentUpdate(np, ns) {
    return this.state.data !== np.data && this.state.data !== ns.data
  }

  componentDidUpdate() {
    const data = {}
    const newTraces = []
    _.forEach(this.state.data, (datum) => {
      if (!data[`${datum.party_size}`]) {
        data[`${datum.party_size}`] = []
      }
      data[`${datum.party_size}`].push(datum)
    })
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
      newTraces.push(plt)
    })
    this.traces = newTraces
    console.log(newTraces)
    Plotly.newPlot("visualization", newTraces, this.layout)
  }

  render() {
    if (!this.state.data) return <div id="visualization" />
    return (
      <div id="visualization2" />
    )
  }
}

Graph.propTypes = {
  data: PropTypes.array
}

Graph.defaultProps = {
  data: []
}
