import React, { PropTypes } from "react"
import { List, ListItem } from "material-ui/List"
import Subheader from "material-ui/Subheader"
import Divider from "material-ui/Divider"
import Checkbox from "material-ui/Checkbox"
import Toggle from "material-ui/Toggle"
import Paper from 'material-ui/Paper';
import PartySizeControl from "./PartySizeControl"

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
        <ListItem primaryText="Online" rightToggle={<Toggle />} />
        <ListItem primaryText="Walk-in" rightToggle={<Toggle />} />
      </List>
    </Paper>
  </div>
)

export default FilterSettings
