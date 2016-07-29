import React, { PropTypes } from "react"
import Checkbox from "material-ui/Checkbox"


export default class PartySizeControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: []
    }
  }

  handleToggle(e, isInputChecked) {
    console.log(e)
    if (isInputChecked) {
      this.state.checked.push(e)
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
        <p> Party size </p>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          return (
            <Checkbox
              key={i}
              label={i}
              style={styles.checkbox}
              onCheck={this.handleToggle}
            />
          )
        })}
      </div>
    )
  }
}

PartySizeControl.propTypes = {
  dataFilter: PropTypes.object
}
