import React, { PropTypes } from "react"
import { VictoryAxis, VictoryArea, VictoryChart } from "victory"

const VictoryAreaGraph = (props) => (
  <VictoryChart
    height={800}
    width={600}
    padding={{
      top: 75,
      bottom: 40,
      left: 40,
      right: 40
    }}
  >
    <VictoryAxis
      label="x-axis"
    />
    <VictoryAxis
      dependentAxis
      label="y-axis"
    />
    <VictoryArea
      style={{
        data: {
          fill: "#334D5C"
        }
      }}
      data={props.data}
      x={"timestamp"}
      y={"actual"}
    />
  </VictoryChart>
)

VictoryAreaGraph.propTypes = {
  data: PropTypes.array
}

export default VictoryAreaGraph
