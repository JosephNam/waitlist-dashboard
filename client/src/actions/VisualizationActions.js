export const SET_VISUALIZATION_FILTER = "SET_VISUALIZATION_FILTER"

export const VisualizationFilters = {
  BAR_GRAPH: "BAR_GRAPH",
  SCATTER_PLOT: "SCATTER_PLOT",
  GROUPED_BAR_GRAPH: "GROUPED_BAR_GRAPH",
  STACKED_BAR_GRAPH: "STACKED_BAR_GRAPH",
  AREA_GRAPH: "AREA_GRAPH"
}

export function setVisualizationFilter(filter) {
  return {
    type: SET_VISUALIZATION_FILTER,
    filter
  }
}
