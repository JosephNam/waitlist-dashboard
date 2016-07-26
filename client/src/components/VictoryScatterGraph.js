import React, { PropTypes } from "react"
import { VictoryAxis, VictoryChart, VictoryScatter } from "victory"

const VictoryScatterGraph = (props) => (
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
      orientation="bottom"
    />
    <VictoryAxis
      dependentAxis
      orientation="left"
      label="y-axis"
    />
    <VictoryScatter
      style={{
        data: {
          fill: "#334D5C"
        }
      }}
      data={props.data}
      x={"timestamp"}
      y={"actual"}
      size={4}
    />
  </VictoryChart>
)

VictoryScatterGraph.propTypes = {
  data: PropTypes.array
}
export default VictoryScatterGraph
