import React, { PropTypes } from "react"
import { VictoryChart, VictoryAxis,
  VictoryLine,
  VictoryScatter
} from "victory"
import { COLORS } from "../helpers/ColorHelpers"

const VictoryLineGraph = (props) => (
  <VictoryChart
    height={500}
    width={((props.windowWidth / 12) * 8) - 15}
  >
    <VictoryAxis
      height={500}
      width={((props.windowWidth / 12) * 8) - 15}
      label="x-axis (Month - Day - Hour)"
      standalone={false}
      tickValues={props.data.map((datum) => datum.timestamp)}
      domainPadding={{ x: 15, y: 15 }}
      tickFormat={props.data.map((datum) => {
        const tick = new Date(datum.timestamp)
        return `${tick.getUTCMonth() + 1} - ${tick.getUTCDate()} - ${tick.getUTCHours()}`
      })}
      scale="time"
      orientation="bottom"
    />
    <VictoryAxis
      height={500}
      width={((props.windowWidth / 12) * 8) - 15}
      dependentAxis
      label="y-axis"
      standalone={false}
    />
    <VictoryLine
      height={500}
      width={((props.windowWidth / 12) * 8) - 15}
      standalone={false}
      data={props.data}
      label="ESTIMATED"
      style={{
        data: {
          stroke: COLORS.ESTIMATED
        }
      }}
      x={"timestamp"}
      y={"estimated"}
    />
    <VictoryLine
      height={500}
      width={((props.windowWidth / 12) * 8) - 15}
      standalone={false}
      data={props.data}
      label="QUOTED"
      style={{
        data: {
          stroke: COLORS.QUOTED
        }
      }}
      x={"timestamp"}
      y={"quoted"}
      size={2}
    />
    <VictoryLine
      height={500}
      width={((props.windowWidth / 12) * 8) - 15}
      standalone={false}
      data={props.data}
      label="ACTUAL"
      style={{
        data: {
          stroke: COLORS.ACTUAL
        }
      }}
      x={"timestamp"}
      y={"actual"}
    />
    <VictoryScatter
      standalone={false}
      height={500}
      width={((props.windowWidth / 12) * 8) - 15}
      data={props.data}
      x={"timestamp"}
      y={"actual"}
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
      size={3}
    />
  </VictoryChart>
)

VictoryLineGraph.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number,
  selectedStructure: PropTypes.object,
  setSelectedRows: PropTypes.func
}

export default VictoryLineGraph
