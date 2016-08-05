import React, { PropTypes } from "react"
import Store from "../Store"
import { setVisualizationFilter, VisualizationFilters } from "../actions/VisualizationActions"
import { Tabs, Tab } from "material-ui/Tabs"

function switchFilter(filter) {
  console.log(filter)
  Store.dispatch(setVisualizationFilter(filter))
}

export default class VisualizationSelection extends React.Component {
  handleChange(value) {
    switchFilter(value)
  }

  render() {
    this.props.list.map((item) => (
      console.log(item.name)
    ))
    return (
      <div>
        <Tabs
          className="chart_tabs"
          onChange={this.handleChange}
        >
          <Tab
            label="scatter" value={`${VisualizationFilters.SCATTER_PLOT}`}
            style={{ backgroundColor: "rgb(218, 55, 67)" }}
          />
          <Tab
            label="line" value={`${VisualizationFilters.LINE_GRAPH}`}
            style={{ backgroundColor: "rgb(218, 55, 67)" }}
          />
        </Tabs>
      </div>
    )
  }
}

VisualizationSelection.propTypes = {
  list: PropTypes.array
}

VisualizationSelection.defaultProps = {
  list: [
    { name: "scatter", type: VisualizationFilters.SCATTER_PLOT },
    { name: "line", type: VisualizationFilters.LINE_GRAPH }
  ]
}
