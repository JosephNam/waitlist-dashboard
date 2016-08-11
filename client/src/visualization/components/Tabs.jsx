import React, { PropTypes } from "react"
import { Tabs, Tab } from "material-ui/Tabs"
import Store from "../../Store"
import { setVisualizationFilter, VisualizationFilters } from "../VisualizationActions"

function switchFilter(filter) {
  Store.dispatch(setVisualizationFilter(filter))
}

export default class VisualizationSelection extends React.Component {
  handleChange(value) {
    switchFilter(value)
  }

  render() {
    return (
      <div>
        <Tabs
          className="chart_tabs"
          onChange={this.handleChange}
        >
          <Tab
            label={`${VisualizationFilters.SCATTER_PLOT.title}`}
            value={VisualizationFilters.SCATTER_PLOT}
            style={{ backgroundColor: "rgb(218, 55, 67)" }}
          />
          <Tab
            label={`${VisualizationFilters.LINE_GRAPH.title}`}
            value={VisualizationFilters.LINE_GRAPH}
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
