import React, { PropTypes } from "react"
import { VictoryLabel } from "victory"

const DashboardLabels = (props) => {
  console.log(props.active)
  if (props.active) {
    console.log("should render")
    return <VictoryLabel {...props} />
  }
  return null
}

DashboardLabels.propTypes = {
  active: PropTypes.bool
}
export default DashboardLabels
