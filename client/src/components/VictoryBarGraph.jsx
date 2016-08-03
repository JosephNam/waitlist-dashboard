import React, { PropTypes } from "react"
import { VictoryAxis, VictoryBar, VictoryLine, VictoryScatter } from "victory"

const VictoryBarGraph = (props) => (
  <svg
    height={500}
    width={(props.windowWidth / 12) * 8}
  >
    <VictoryAxis
      height={500}
      width={(props.windowWidth / 12) * 8}
      label="x-axis"
      standalone={false}
    />
    <VictoryAxis
      height={500}
      width={(props.windowWidth / 12) * 8}
      dependentAxis
      standalone={false}
      label="y-axis"
      standalone={false}
    />
    <VictoryScatter
      standalone={false}
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
      data={props.data}
      x={"timestamp"}
      y={"actual"}
      size={4}
    />
  </svg>
)

VictoryBarGraph.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number
}

export default VictoryBarGraph
