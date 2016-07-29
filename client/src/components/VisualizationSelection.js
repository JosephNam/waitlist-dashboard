import React, { PropTypes } from "react"
import Store from "../Store"
import { setVisualizationFilter, VisualizationFilters } from "../actions/VisualizationActions"
import DropDownMenu from "material-ui/DropDownMenu"
import MenuItem from "material-ui/MenuItem"

function switchFilter(filter) {
  console.log(filter)
  Store.dispatch(setVisualizationFilter(filter))
}

export default class VisualizationSelection extends React.Component {
  handleChange(event, index, value) {
    switchFilter(value)
  }

  render() {
    return (
      <div>
        <DropDownMenu value={VisualizationFilters.BAR_GRAPH} onChange={this.handleChange}>
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
    VisualizationFilters.BAR_GRAPH,
    VisualizationFilters.SCATTER_PLOT,
    VisualizationFilters.LINE_GRAPH
  ]
}
