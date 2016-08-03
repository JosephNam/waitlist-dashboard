import React, { PropTypes } from "react"
import Checkbox from "material-ui/Checkbox"
import { COLORS } from "../helpers/ColorHelpers"
import _ from "lodash"

export default class PartySizeControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [1, 2, 3, 4, 5, 6]
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(e, isInputChecked) {
    console.log(e.target.id)
    if (isInputChecked === false) {
      const index = this.state.checked.indexOf(parseInt(e.target.id, 10))
      this.state.checked.splice(index, 1)
      this.props.reloadData(this.state.checked, this.props.dataFilter)
    } else {
      this.state.checked.push(parseInt(e.target.id, 10))
      this.props.reloadData(this.state.checked, this.props.dataFilter)
    }
    console.log(this.state.checked)
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
        <p> Party size </p>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ backgroundColor: COLORS[i] }}>
            <Checkbox
              key={i}
              id={i}
              checked={_.includes(this.state.checked, i)}
              label={i}
              inputStyle={{ backgroundColor: "white" }}
              iconStyle={{ backgroundColor: "white" }}
              labelStyle={{ color: "white" }}
              style={styles.checkbox}
              onCheck={this.handleToggle}
            />
          </div>
        ))}
      </div>
    )
  }
}

PartySizeControl.propTypes = {
  dataFilter: PropTypes.object,
  reloadData: PropTypes.func
}
