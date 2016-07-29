import React, { PropTypes } from "react"
import { VictoryAxis, VictoryLine, VictoryScatter } from "victory"

const VictoryLineGraph = (props) => (
  <svg
    height={500}
    width={(props.windowWidth / 12) * 8}
  >
    <VictoryAxis
      height={500}
      width={(props.windowWidth / 12) * 8}
      label="x-axis"
    />
    <VictoryAxis
      height={500}
      width={(props.windowWidth / 12) * 8}
      dependentAxis
      label="y-axis"
    />
    <VictoryLine
      height={500}
      width={(props.windowWidth / 12) * 8}
      style={{
        data: {
          stroke: "#822722",
          strokeWidth: 3
        }
      }}
      animate={{
        duration: 500,
        onExit: {
          duration: 1000,
          before: () => ({ y: -1 })
        }
      }}
      data={props.data}
      x={"timestamp"}
      y={"actual"}
    />
    <VictoryScatter
      height={500}
      width={(props.windowWidth / 12) * 8}
      style={{
        data: {
          fill: (data) => {
            if (data.party_size === 1) {
              return "red"
            } else if (data.party_size === 2) {
              return "blue"
            } else if (data.party_size === 3) {
              return "green"
            } else if (data.party_size === 4) {
              return "grey"
            } else if (data.party_size === 5) {
              return "black"
            } else if (data.party_size === 6) {
              return "orange"
            }
            return "gray"
          },
          stroke: "white",
          strokeWidth: 0.5
        }
      }}
      animate={{
        duration: 500,
        onExit: {
          duration: 1000,
          before: () => ({ y: -1 })
        }
      }}
      data={props.data}
      x={"timestamp"}
      y={"actual"}
      size={2}
    />
  </svg>
)

VictoryLineGraph.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number
}
export default VictoryLineGraph
