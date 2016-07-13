import React, { PropTypes } from "react"
import { VictoryBar, VictoryStack } from "victory"

const propTypes = {
  height: PropTypes.number,
  data: PropTypes.object
}

const VictoryStackBar = ({ height, data }) => (
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
    {height}
    {data}
  </VictoryStack>
)

VictoryStackBar.propTypes = propTypes

export default VictoryStackBar
