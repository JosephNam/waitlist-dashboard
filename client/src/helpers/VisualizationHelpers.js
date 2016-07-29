import React from "react"
import VictoryBarGraph from "../components/VictoryBarGraph"
import VictoryScatterGraph from "../components/VictoryScatterGraph"
import VictoryLineGraph from "../components/VictoryLineGraph"

export const getVisible = (filter, data, windowWidth, selectedRows, setSelectedPoint) => {
  switch (filter) {
    case "BAR_GRAPH":
      return <VictoryBarGraph data={data} windowWidth={windowWidth} />
    case "SCATTER_PLOT":
      return (
        <VictoryScatterGraph
          data={data}
          windowWidth={windowWidth}
          selectedRows={selectedRows}
          submitSelectedPoint={setSelectedPoint}
        />
      )
    case "LINE_GRAPH":
      return <VictoryLineGraph data={data} windowWidth={windowWidth} />
    default:
      return <VictoryLineGraph data={data} windowWidth={windowWidth} />
  }
}
