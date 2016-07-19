import React from "react"
import VictoryBarGraph from "../components/VictoryBarGraph"
import VictoryScatterGraph from "../components/VictoryScatterGraph"
import VictoryAreaGraph from "../components/VictoryAreaGraph"
import VictoryLineGraph from "../components/VictoryLineGraph"
import VictoryStackGraph from "../components/VictoryStackGraph"
import VictoryGroupGraph from "../components/VictoryGroupGraph"

export const getVisible = (filter) => {
  switch (filter) {
    case "BAR_GRAPH":
      return <VictoryBarGraph />
    case "SCATTER_PLOT":
      return <VictoryScatterGraph />
    case "AREA_GRAPH":
      return <VictoryAreaGraph />
    case "LINE_GRAPH":
      return <VictoryLineGraph />
    case "STACKED_BAR_GRAPH":
      return <VictoryStackGraph />
    case "GROUPED_BAR_GRAPH":
      return <VictoryGroupGraph />
    default:
      return <VictoryBarGraph />
  }
}
