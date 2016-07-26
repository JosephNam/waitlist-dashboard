import React, { PropTypes } from "react"
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter } from "victory"

const VictoryLineGraph = (props) => (
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
    <VictoryScatter
      data={props.data}
      x={"timestamp"}
      y={"actual"}
      size={1}
    />
    <VictoryLine
      animate={{
        duration: 500,
        onExit: {
          duration: 1000,
          before: () => ({ y: -1 })
        }
      }}
      data={props.data}
      x={"timestamp"}
      y={"quoted"}
    />
  </VictoryChart>
)

VictoryLineGraph.propTypes = {
  data: PropTypes.array
}
export default VictoryLineGraph
