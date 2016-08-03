import React, { PropTypes } from "react"
import { VictoryAxis, VictoryScatter } from "victory"
import { COLORS } from "../helpers/ColorHelpers"

const VictoryScatterGraph = (props) => (
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
    <VictoryScatter
      height={500}
      width={(props.windowWidth / 12) * 8}
      data={props.data}
      x={"timestamp"}
      y={"actual"}
      size={3}
      symbol={(data) => {
        if (props.selectedStructure[`${data.timestamp}-${data.party_size}`]) {
          return "triangleUp"
        }
        return "circle"
      }}
      style={{
        data: {
          fill: (data) => (
            COLORS[data.party_size]
          )
        }
      }}
      events={[{
        target: "data",
        eventHandlers: {
          onClick: () => (
            [{
              mutation: (elementProps) => {
                props.setSelectedRows(elementProps.datum)
                return {
                  style:
                    Object.assign({}, elementProps.style, {
                      fill: "yellow"
                    })
                }
              }
            }]
          )
        }
      }]}
    />
  </svg>
)

VictoryScatterGraph.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
  selectedStructure: PropTypes.object,
  setSelectedRows: PropTypes.func
}


export default VictoryScatterGraph
