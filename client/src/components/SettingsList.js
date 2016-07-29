import React from "react"
import { List, ListItem } from "material-ui/List"
import Subheader from "material-ui/Subheader"
import Divider from "material-ui/Divider"
import Checkbox from "material-ui/Checkbox"
import Toggle from "material-ui/Toggle"
import MobileTearSheet from "./MobileTearSheet"
const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}

const FilterSettings = () => (
  <div style={styles.root}>
  <MobileTearSheet>
    <List>
      <Subheader>Filter</Subheader>
      <ListItem
        primaryText="Profile photo"
        secondaryText="Change your Google+ profile photo"
      />
      <ListItem
        primaryText="Show your status"
        secondaryText="Your status is visible to everyone you use with"
      />
    </List>
    <Divider />
    <List>
      <Subheader>Hangout Notifications</Subheader>
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText="Notifications"
        secondaryText="Allow notifications"
      />
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText="Sounds"
        secondaryText="Hangouts message"
      />
      <ListItem
        leftCheckbox={<Checkbox />}
        primaryText="Video sounds"
        secondaryText="Hangouts video call"
      />
    </List>
    <Divider />
    <List>
      <Subheader>Priority Interruptions</Subheader>
      <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
      <ListItem primaryText="Calls" rightToggle={<Toggle />} />
      <ListItem primaryText="Messages" rightToggle={<Toggle />} />
    </List>
  </MobileTearSheet>


  </div>
)

export default FilterSettings
