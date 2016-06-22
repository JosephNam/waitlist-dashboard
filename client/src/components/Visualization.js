import React, { PropTypes } from "react"
import { VictoryChart } from "victory"

const Visualization = (props) => (
  <VictoryChart
    domainPadding={{ x: 50 }}
  >
    {props.children}
  </VictoryChart>
)

Visualization.propTypes = {
  children: PropTypes.object
}

export default Visualization
