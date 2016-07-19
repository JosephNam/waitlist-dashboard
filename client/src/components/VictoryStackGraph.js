import React from "react"
import { VictoryChart, VictoryBar, VictoryStack } from "victory"

const VictoryStackGraph = () => (
  <VictoryChart
    height={500}
    domainPadding={{ x: 50 }}
  >
    <VictoryStack
      height={500}
      colorScale={"qualitative"}
    >
      <VictoryBar
        data={[
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 }
        ]}
      />
      <VictoryBar
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 3, y: 1 }
        ]}
      />
      <VictoryBar
        data={[
          { x: 1, y: 3 },
          { x: 2, y: 4 },
          { x: 3, y: 2 }
        ]}
      />
    </VictoryStack>
  </VictoryChart>
)

export default VictoryStackGraph
