import React from "react"
import { VictoryChart, VictoryLine } from "victory"

const VictoryLineGraph = () => (
  <VictoryChart
    height={500}
    domainPadding={{ x: 50 }}
  >
    <VictoryLine />
  </VictoryChart>
)

export default VictoryLineGraph
