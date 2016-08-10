/* global Plotly: true */
/* global window: true */
import React, { PropTypes } from "react"
import _ from "lodash"
import { COLORS } from "./helpers/ColorHelpers"

const propTypes = {
  windowWidth: PropTypes.number,
  data: PropTypes.array,
  graphType: PropTypes.object
}

export default class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graphType: props.graphType
    }
    this.state.layout = {
      xaxis: {
        type: "date",
        title: "Date"
      },
      yaxis: {
        title: "Actual Wait Time"
      },
      width: (this.props.windowWidth / 12) * 8,
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
        mode: this.state.graphType.mode,
        type: this.state.graphType.plotly_type,
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
    console.log(np)
    this.setState({
      data: np.data,
      graphType: np.graphType
    })
  }

  shouldComponentUpdate(np, ns) {
    console.log(this.state, ns)
    console.log(this.state.data !== ns.data || this.state.graphType !== ns.graphType)
    return this.state.data !== ns.data || this.state.graphType !== ns.graphType
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
      let plt
      if (list[0]) {
        plt = {
          name: `Party Size ${i}`,
          x,
          y,
          mode: this.state.graphType.mode,
          type: this.state.graphType.plotly_type,
          marker: {
            color: COLORS[`${list[0].party_size}`],
            size
          }
        }
      } else {
        plt = {
          name: "No Data Found",
          x,
          y,
          mode: this.state.graphType.mode,
          type: this.state.graphType.plotly_type
        }
      }
      newTraces.push(plt)
    })
    this.traces = newTraces
    console.log(newTraces)
    Plotly.newPlot("visualization", newTraces, this.state.layout)
  }

  render() {
    if (!this.state.data) return <div id="visualization" />
    return (
      <div id="visualization2" />
    )
  }
}

Graph.propTypes = propTypes

Graph.defaultProps = {
  data: []
}
