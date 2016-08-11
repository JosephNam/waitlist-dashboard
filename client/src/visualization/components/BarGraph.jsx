/* global Plotly: true */
import React, { PropTypes } from "react"
import _ from "lodash"
import { COLORS } from "../../helpers/ColorHelpers"

const propTypes = {
  windowWidth: PropTypes.number,
  data: PropTypes.array
}

export default class BarGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.layout = {
      xaxis: {
        title: "Party Size"
      },
      yaxis: {
        title: "Actual Wait Time"
      },
      width: (this.props.windowWidth / 12) * 8,
      height: 600
    }

    this.state.data = this.props.data

    const data = {}
    _.forEach(this.state.data, (datum) => {
      if (!data[`${datum.party_size}`]) {
        data[`${datum.party_size}`] = []
      }
      data[`${datum.party_size}`].push(datum)
    })

    this.traces = []
    _.forEach(data, (list, i) => {
      const x = _.map(list, (datum) => (datum.party_size))
      const y = _.map(list, (datum) => (datum.actual))
      const plt = {
        name: `Party Size ${i}`,
        x,
        y,
        type: "bar",
        marker: {
          color: COLORS[`${list[0].party_size}`]
        }
      }
      this.traces.push(plt)
    })
  }
  componentDidMount() {
    // work on DOM after render per facebook guidelines
    Plotly.newPlot("visualization", this.traces, this.state.layout)
  }
  componentWillReceiveProps(np) {
    // set next state
    this.setState({
      data: np.data
    })
  }
  shouldComponentUpdate(np, ns) {
    return this.state.data !== ns.data
  }

  componentDidUpdate() {
    // again work on DOM after update
    const data = {}
    const newTraces = []
    _.forEach(this.state.data, (datum) => {
      if (!data[`${datum.party_size}`]) {
        data[`${datum.party_size}`] = []
      }
      data[`${datum.party_size}`].push(datum)
    })
    _.forEach(data, (list, i) => {
      const x = _.map(list, (datum) => (datum.party_size))
      const y = _.map(list, (datum) => (datum.actual))
      let plt
      // if there is data render the graph, else render a default no data found graph
      if (list[0]) {
        plt = {
          name: `Party Size ${i}`,
          x,
          y,
          type: "bar",
          marker: {
            color: COLORS[`${list[0].party_size}`]
          }
        }
      } else {
        plt = {
          name: "No Data Found",
          x,
          y,
          type: "bar"
        }
      }
      newTraces.push(plt)
    })
    this.traces = newTraces
    Plotly.newPlot("visualization", newTraces, this.state.layout)
  }

  render() {
    if (!this.state.data) return <div id="visualization" />
    // dummy render
    return (
      <div id="visualization2" />
    )
  }
}

BarGraph.propTypes = propTypes
