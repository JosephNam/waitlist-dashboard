import React, { PropTypes } from "react"
import Checkbox from "material-ui/Checkbox"
import _ from "lodash"
import ToggleCheckBox from "material-ui/svg-icons/toggle/check-box"
import ToggleCheckBoxOutlineBlank from "material-ui/svg-icons/toggle/check-box-outline-blank"
import { ListItem } from "material-ui/List"
import { COLORS } from "../helpers/ColorHelpers"

export default class PartySizeControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [1, 2, 3, 4, 5, 6]
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(e, isInputChecked) {
    if (isInputChecked === false) {
      const index = this.state.checked.indexOf(parseInt(e.target.id, 10))
      this.state.checked.splice(index, 1)
      this.props.reloadData(this.state.checked, this.props.dataFilter)
    } else {
      this.state.checked.push(parseInt(e.target.id, 10))
      this.props.reloadData(this.state.checked, this.props.dataFilter)
    }
  }

  render() {
    const styles = {
      block: {
        maxWidth: 250
      },
      checkbox: {
        marginBottom: 16
      }
    }
    return (
      <div style={styles.block}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ListItem
            key={`list${i}`}
            leftCheckbox={
              <Checkbox
                id={i}
                checkedIcon={<ToggleCheckBox />}
                uncheckedIcon={<ToggleCheckBoxOutlineBlank />}
                checked={_.includes(this.state.checked, i)}
                iconStyle={{ fill: COLORS[i] }}
                onCheck={this.handleToggle}
                key={i}
              />
            }
            primaryText={i}
          />
        ))}
      </div>
    )
  }
}

PartySizeControl.propTypes = {
  dataFilter: PropTypes.object,
  reloadData: PropTypes.func
}
