import React, { PropTypes } from "react"
import { VictoryLabel } from "victory"

const DashboardLabels = (props) => {
  if (props.active) {
    return <VictoryLabel {...props} />
  }
  return null
}

DashboardLabels.propTypes = {
  active: PropTypes.bool
}

export default DashboardLabels
