import React from "react"
import { VictoryAxis, VictoryBar, VictoryStack } from "victory"

const VictoryStackGraph = (props) => (
  <svg width={450} height={450}>
    <VictoryAxis
      label="x-axis"
    />
    <VictoryAxis dependentAxis
      label="y-axis"
    />
    <VictoryStack
      height={500}
      colorScale={"qualitative"}
    >
      <VictoryBar
        data={props.data}
      />
    </VictoryStack>
  </svg>
)

export default VictoryStackGraph
