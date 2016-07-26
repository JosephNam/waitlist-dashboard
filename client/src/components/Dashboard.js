import React, { PropTypes } from "react"
import VisibleVisualization from "../containers/VisualizationContainer"
import VisualizationSelection from "./VisualizationSelection"
import FilterContainer from "../containers/FilterContainer"
import VisibleRestaurantsTable from "../containers/TableContainer"
import CircularProgress from "material-ui/CircularProgress"

const propTypes = {
  load: PropTypes.func,
  dataFilter: PropTypes.object,
  isLoadingData: PropTypes.bool
}

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    console.log("dashboard props", this.props)
    this.props.load("/estimates", this.props.dataFilter)
    this.metastate = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.metastate.isLoading = false
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <VisualizationSelection />
          </div>
          <div className="row">
            <FilterContainer />
          </div>
          <div className="row">
            <VisibleVisualization />
          </div>
          <div className="row">
            <VisibleRestaurantsTable />
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = propTypes
