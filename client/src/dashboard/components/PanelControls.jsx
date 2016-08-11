import React, { PropTypes } from "react"
import PartySizeControl from "./PartySizeControl"
import { COLORS } from "../helpers/ColorHelpers"

const propTypes = {
  reloadData: PropTypes.func,
  dataFilter: PropTypes.object
}

const PanelControls = (props) => (
  <div>
    <div className="row">
      <PartySizeControl reloadData={props.reloadData} dataFilter={props.dataFilter} />
    </div>
    <div style={{ backgroundColor: COLORS.ESTIMATED }}className="row">
      <p> Estimated </p>
    </div>
    <div style={{ backgroundColor: COLORS.QUOTED }}className="row">
      <p> Quoted </p>
    </div>
    <div style={{ backgroundColor: COLORS.ACTUAL }}className="row">
      <p> Actual </p>
    </div>
  </div>
)

PanelControls.propTypes = propTypes

export default PanelControls
