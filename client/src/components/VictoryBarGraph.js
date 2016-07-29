import React, { PropTypes } from "react"
import { VictoryAxis, VictoryBar } from "victory"

const VictoryBarGraph = (props) => (
  <svg
    height={500}
    width={(props.windowWidth / 12) * 8}
  >
    <VictoryAxis
      height={500}
      width={(props.windowWidth / 12) * 8}
      standalone={false}
      label="Time"
    />
    <VictoryAxis
      height={500}
      width={(props.windowWidth / 12) * 8}
      dependentAxis
      standalone={false}
      label="y-axis"
    />
    <VictoryBar
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
          width: 5
        }
      }}
      height={500}
      width={(props.windowWidth / 12) * 8}
      standalone={false}
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
  </svg>
)

VictoryBarGraph.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number
}

export default VictoryBarGraph
