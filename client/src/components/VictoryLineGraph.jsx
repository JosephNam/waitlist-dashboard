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
      domainPadding={{ x: 15, y: 15 }}
      tickFormat={props.data.map((datum) => {
        const tick = new Date(datum.timestamp)
        return `${tick.getUTCMonth() + 1} - ${tick.getUTCDate()} - ${tick.getUTCHours()}`
      })}
      label="x-axis (Month - Day - Hour)"
      standalone={false}
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
      interpolation={"basis"}
      x={"timestamp"}
      y={"availability"}
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
      interpolation={"basis"}
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
      interpolation={"basis"}
      x={"timestamp"}
      y={"actual"}
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
