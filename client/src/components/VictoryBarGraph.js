import React, { PropTypes } from "react"
import { VictoryAxis, VictoryBar } from "victory"

const VictoryBarGraph = (props) => (
  <svg
    height={800}
    width={600}
  >
    <VictoryAxis
      label="x-axis"
    />
    <VictoryAxis
      dependentAxis
      label="y-axis"
    />
    <VictoryBar
      animate={{
        duration: 500,
        onExit: {
          duration: 1000,
          before: () => ({ y: -1 })
        }
      }}
      style={{
        data: {
          fill: "#334D5C"
        }
      }}
      data={props.data}
      x={"timestamp"}
      y={"actual"}
    />
  </svg>
)

VictoryBarGraph.propTypes = {
  data: PropTypes.array
}
export default VictoryBarGraph
