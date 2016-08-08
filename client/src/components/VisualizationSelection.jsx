import React, { PropTypes } from "react"
import DropDownMenu from "material-ui/DropDownMenu"
import MenuItem from "material-ui/MenuItem"
import Store from "../Store"
import { setVisualizationFilter, VisualizationFilters } from "../actions/VisualizationActions"

function switchFilter(filter) {
  Store.dispatch(setVisualizationFilter(filter))
}

export default class VisualizationSelection extends React.Component {
  handleChange(event, index, value) {
    switchFilter(value)
  }

  render() {
    return (
      <div>
        <DropDownMenu value={VisualizationFilters.SCATTER_PLOT} onChange={this.handleChange}>
        {this.props.list.map((item, index) => (
          <MenuItem
            id={`button${index}`}
            key={index}
            value={item}
            primaryText={`${item}`}
          />
        ))}
        </DropDownMenu>
      </div>
    )
  }
}

VisualizationSelection.propTypes = {
  list: PropTypes.array
}

VisualizationSelection.defaultProps = {
  list: [
    VisualizationFilters.SCATTER_PLOT,
    VisualizationFilters.LINE_GRAPH
  ]
}
