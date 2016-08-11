import React, { PropTypes } from "react"
import { Card, CardHeader } from "material-ui/Card"

/*
 * TODO:
 * take out the hard coded values for online and walk in joins
 * view getJoins in server/helpers/DataReadHelpers.js associated with the cache initialization
 */

const StatBadges = (props) => (
  <div className="row col l10 offset-l2">
    <div className="col s6 m3">
      <Card>
        <CardHeader
          title={"28%"}
          subtitle="Online joins"
          avatar="assets/user_join.png"
          actAsExpander={false}
          showExpandableButton={false}
        />
      </Card>
    </div>
    <div className="col s6 m3">
      <Card>
        <CardHeader
          title={"72%"}
          subtitle="Walk-in joins"
          avatar="assets/user_join.png"
          actAsExpander={false}
          showExpandableButton={false}
        />
      </Card>
    </div>
    <div className="col s6 m3">
      <Card>
        <CardHeader
          title={`${Math.floor(props.overquoted.lowOverquote)}%`}
          subtitle="Overquoted"
          avatar="assets/shrug.png"
          actAsExpander={false}
          showExpandableButton={false}
        />
      </Card>
    </div>
    <div className="col s6 m3">
      <Card>
        <CardHeader
          title={`${(Math.floor(props.overquoted.highOverquote))}%`}
          subtitle="Overquoted > 10 min"
          avatar="assets/mad.jpeg"
          actAsExpander={false}
          showExpandableButton={false}
        />
      </Card>
    </div>

  </div>
)

StatBadges.propTypes = {
  overquoted: PropTypes.number
}

export default StatBadges
