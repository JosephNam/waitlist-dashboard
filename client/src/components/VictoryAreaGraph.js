import React from "react"
import { VictoryChart, VictoryArea } from "victory"

const VictoryAreaGraph = () => (
  <VictoryChart
    height={500}
    domainPadding={{ x: 50 }}
  >
    <VictoryArea />
  </VictoryChart>
)

export default VictoryAreaGraph
