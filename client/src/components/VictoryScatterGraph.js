import React, { PropTypes } from "react"
import { VictoryAxis, VictoryScatter } from "victory"

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
        if (data.selected) {
          return "triangleUp"
        }
        return "circle"
      }}
      style={{
        data: {
          fill: "gold",
          stroke: "orange",
          strokeWidth: 3
        },
        labels: {
          fill: "none",
          padding: 12
        }
      }}
      events={[{
        target: "data",
        eventHandlers: {
          onClick: () => (
            [{
              mutation: (elementProps) => {
                props.submitSelectedPoint(elementProps.datum, props.selectedRows, props.data)
                return {
                  style:
                    Object.assign({}, elementProps.style, {
                      stroke: "orange", fill: "gold"
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
  selectedRows: PropTypes.array,
  submitSelectedPoint: PropTypes.func,
  windowWidth: PropTypes.number
}
export default VictoryScatterGraph
