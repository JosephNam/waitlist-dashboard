import React from "react"
import { VictoryChart, VictoryBar } from "victory"

const VictoryBarGraph = () => (
  <VictoryChart
    height={500}
    domainPadding={{ x: 50 }}
  >
    <VictoryBar />
  </VictoryChart>
)

export default VictoryBarGraph
