import React from "react"
import VictoryBarGraph from "../components/VictoryBarGraph"
import VictoryScatterGraph from "../components/VictoryScatterGraph"
import VictoryLineGraph from "../components/VictoryLineGraph"

export const getVisible = (filter, data) => {
  switch (filter) {
    case "BAR_GRAPH":
      return <VictoryBarGraph data={data} />
    case "SCATTER_PLOT":
      return <VictoryScatterGraph data={data} />
    case "LINE_GRAPH":
      return <VictoryLineGraph data={data} />
    default:
      return <VictoryLineGraph data={data} />
  }
}
