import React, { PropTypes } from "react"
import { Card } from "material-ui/Card"

const StatBadges = (props) => (
  <div className="row">
    <div className="col s2 offset-s2">
      <Card>
        <p>Waitlist overquoted</p>
        <p>{props.overquoted}%</p>
      </Card>
    </div>
    <div className="col s2 offset-s1">
      <Card>
        <p>Waitlist overquoted</p>
        <p>{props.overquoted}%</p>
      </Card>
    </div>
    <div className="col s2 offset-s1">
      <Card>
        <p>Waitlist overquoted</p>
        <p>{props.overquoted}%</p>
      </Card>
    </div>
  </div>
)

StatBadges.propTypes = {
  overquoted: PropTypes.number
}

export default StatBadges
