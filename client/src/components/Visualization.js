import React, { PropTypes } from "react"

const Visualization = (props) => (
  <div>
    <p> Waitlist Visualization </p>
    {props.children.graph}
  </div>
)

Visualization.propTypes = {
  children: PropTypes.object
}

export default Visualization
