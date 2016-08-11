/* global Plotly: true */
/* global window: true */
import React, { PropTypes } from "react"
import _ from "lodash"
import { COLORS } from "../helpers/ColorHelpers"

/*
 * form of graphType
 * {
 *   plotly_type: string,
 *   mode: string,
 *   title: string
 * }
 */
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
    // prepare graph for initial render
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
    // work on DOM after render per facebook guidelines
    Plotly.newPlot("visualization", this.traces)
  }

  componentWillReceiveProps(np) {
    // set next state
    this.setState({
      data: np.data,
      graphType: np.graphType
    })
  }

  /*
   * necessary to avoid unecessary render updates in the middle of render
   */
  shouldComponentUpdate(np, ns) {
    return this.state.data !== ns.data || this.state.graphType !== ns.graphType
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
      const x = _.map(list, (datum) => (datum.timestamp))
      const y = _.map(list, (datum) => (datum.actual))
      const size = _.map(list, (datum) => (datum.size + 5))
      let plt
      // if there is data render the graph, else render a default no data found graph
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
    // dummy render
    return (
      <div id="visualization2" />
    )
  }
}

Graph.propTypes = propTypes

Graph.defaultProps = {
  data: []
}
