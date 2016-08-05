import React, { PropTypes } from "react"
import { VictoryAxis, VictoryChart, VictoryScatter } from "victory"
import { COLORS } from "../helpers/ColorHelpers"

const VictoryScatterGraph = (props) => (
  <VictoryChart
    height={500}
    width={(props.windowWidth / 12) * 8}
  >
    <VictoryAxis
      height={500}
      width={(props.windowWidth / 12) * 8}
      domainPadding={{ x: 15, y: 15 }}
      tickFormat={(x) => {
        console.log(x)
        const tick = new Date(x)
        return `${tick.getUTCMonth() + 1} - ${tick.getUTCDate()} - ${tick.getUTCHours()}`
      }}
      label="x-axis (Month - Day - Hour)"
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
              }
            }]
          )
        }
      }]}
    />
  </VictoryChart>
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
