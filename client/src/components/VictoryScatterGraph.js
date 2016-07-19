import React from "react"
import { VictoryChart, VictoryScatter } from "victory"

const VictoryScatterGraph = () => (
  <VictoryChart
    height={500}
    domainPadding={{ x: 50 }}
  >
    <VictoryScatter />
  </VictoryChart>
)

export default VictoryScatterGraph
