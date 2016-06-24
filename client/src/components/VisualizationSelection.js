import React, { PropTypes } from "react"
import Store from "../Store"
import { setVisualizationFilter, VisualizationFilters } from "../actions/VisualizationActions"

function switchFilter(filter) {
  console.log(filter)
  Store.dispatch(setVisualizationFilter(filter))
}
const VisualizationSelection = ({ list }) => (
  <div>
  {list.map((item, index) => (
    <button
      className="filter-switcher waves-effect waves-light btn"
      key={index}
      onClick={() => { switchFilter(item) }}
    >
      {index.toString()}
    </button>
  ))}
  </div>
)

VisualizationSelection.propTypes = {
  list: PropTypes.array
}

VisualizationSelection.defaultProps = {
  list: [
    VisualizationFilters.BAR_GRAPH,
    VisualizationFilters.SCATTER_PLOT,
    VisualizationFilters.AREA_GRAPH,
    VisualizationFilters.STACKED_BAR_GRAPH,
    VisualizationFilters.GROUPED_BAR_GRAPH
  ]
}

export default VisualizationSelection
