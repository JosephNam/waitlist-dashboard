import React, { PropTypes } from "react"
import { List, ListItem } from "material-ui/List"
import Subheader from "material-ui/Subheader"
import Divider from "material-ui/Divider"
import Checkbox from "material-ui/Checkbox"
import Paper from "material-ui/Paper"
import PartySizeControl from "./PartySizeControl"
import ContentSend from "material-ui/svg-icons/action/timeline"
import { COLORS } from "../helpers/ColorHelpers"


const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
}
const propTypes = {
  reloadData: PropTypes.func,
  dataFilter: PropTypes.object
}
const FilterSettings = (props) => (
  <div style={styles.root}>
    <Paper zDepth={1} className="col l12 m12 s12">
      <List>
        <Subheader>Party Size</Subheader>
        <PartySizeControl reloadData={props.reloadData} dataFilter={props.dataFilter} />
      </List>
      <Divider />
      <List>
        <Subheader>Origin</Subheader>
        <ListItem primaryText="Online" leftCheckbox={<Checkbox />} />
        <ListItem primaryText="Walk-in" leftCheckbox={<Checkbox />} />
      </List>
      <Divider />
      <List>
        <Subheader>Line Graph Legend</Subheader>
        <ListItem
          primaryText="availability"
          disabled={true}
          leftCheckbox={
            <Checkbox
              id={1}
              key={1}
              checkedIcon={<ContentSend />}
              uncheckedIcon={<ContentSend />}
              checked={true}
              iconStyle={{ fill: COLORS.ESTIMATED }}
            />
          }
        />
        <ListItem
          primaryText="actual"
          disabled={true}
          leftCheckbox={
            <Checkbox
              id={2}
              key={2}
              checkedIcon={<ContentSend />}
              uncheckedIcon={<ContentSend />}
              checked={true}
              iconStyle={{ fill: COLORS.ACTUAL }}
            />
          }
        />
        <ListItem
          primaryText="quoted"
          disabled={true}
          leftCheckbox={
            <Checkbox
              id={2}
              key={2}
              checkedIcon={<ContentSend />}
              uncheckedIcon={<ContentSend />}
              checked={true}
              iconStyle={{ fill: COLORS.QUOTED }}
            />
          }
        />
      </List>
    </Paper>
  </div>
)
FilterSettings.propTypes = propTypes
export default FilterSettings
