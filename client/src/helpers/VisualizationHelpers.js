import React from "react"
import VictoryScatterGraph from "../components/VictoryScatterGraph"
import VictoryLineGraph from "../components/VictoryLineGraph"

const getVisible = (filter,
  data, windowWidth,
  start, end,
  selectedStructure, setSelectedRows) => {
  switch (filter) {
    case "SCATTER_PLOT":
      return (
        <VictoryScatterGraph
          data={data}
          windowWidth={windowWidth}
          selectedStructure={selectedStructure}
          setSelectedRows={setSelectedRows}
        />
      )
    case "LINE_GRAPH":
      return (
        <VictoryLineGraph
          data={data}
          windowWidth={windowWidth}
          selectedStructure={selectedStructure}
          setSelectedRows={setSelectedRows}
        />
      )
    default:
      return <VictoryLineGraph data={data} windowWidth={windowWidth} />
  }
}

export default getVisible
