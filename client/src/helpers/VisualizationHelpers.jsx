import React from "react"
import { VisualizationFilters } from "../ducks/visualization"
import ScatterPlot from "../visualization/components/ScatterPlot"
import LineGraph from "../visualization/components/LineGraph"
import BarGraph from "../visualization/components/BarGraph"

const getVisible = (filter,
  data, windowWidth) => {
  console.log(filter)
  switch (filter) {
    case VisualizationFilters.SCATTER_PLOT:
      return (
        <ScatterPlot
          data={data}
          windowWidth={windowWidth}
        />
      )
    case VisualizationFilters.LINE_GRAPH:
      return (
        <LineGraph
          data={data}
          windowWidth={windowWidth}
        />
      )
    case VisualizationFilters.BAR_GRAPH:
      return (
        <BarGraph data={data} windowWidth={windowWidth} />
      )
    default:
      return <LineGraph data={data} windowWidth={windowWidth} />
  }
}

export default getVisible
