import React, { PropTypes } from "react"
// import VisibleVisualization from "../containers/VisualizationContainer"
import VisualizationSelection from "./VisualizationSelection"
import FilterContainer from "../containers/FilterContainer"
import VisibleRestaurantsTable from "../containers/TableContainer"
import StatBadges from "./StatBadges"
import CircularProgress from "material-ui/CircularProgress"
import LinearProgress from "material-ui/LinearProgress"
import { VisualizationFilters } from "../actions/VisualizationActions"
import { getVisible } from "../helpers/VisualizationHelpers"
import PartySizeControl from "./PartySizeControl"

const propTypes = {
  load: PropTypes.func,
  dataFilter: PropTypes.object,
  isLoadingData: PropTypes.bool,
  overquoted: PropTypes.number,
  windowWidth: PropTypes.number,
  data: PropTypes.array,
  visualizationFilter: PropTypes.oneOf([
    VisualizationFilters.BAR_GRAPH,
    VisualizationFilters.SCATTER_PLOT,
    VisualizationFilters.LINE_GRAPH
  ]),
  isInitialLoad: PropTypes.bool,
  submitSelectedPoint: PropTypes.func,
  selectedRows: PropTypes.array
}

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.props.load("/estimates", this.props.dataFilter, true)
    console.log(this.props.dataFilter)
  }

  render() {
    return (
      <div>
        <div className="centered" hidden={!this.props.isInitialLoad}>
          <CircularProgress size={2} />
        </div>
        <div hidden={this.props.isInitialLoad}>
          <div className="row badges">
            <StatBadges overquoted={this.props.overquoted} />
          </div>
          <div className="row">
            <div className="col l2 controls">
              <PartySizeControl />
            </div>
            <div className="col l8 visualization">
              <div hidden={!this.props.isLoadingData}>
                <LinearProgress />
              </div>
              <div hidden={this.props.isLoadingData}>
                {getVisible(this.props.visualizationFilter,
                  this.props.data,
                  this.props.windowWidth,
                  this.props.selectedRows,
                  this.props.submitSelectedPoint)}
              </div>
            </div>
            <div className="col l2 controls">
              Graph Type
              <VisualizationSelection />
            </div>
          </div>
          <div className="row">
            <FilterContainer />
          </div>
          <div className="row">
            <div className="col l8 offset-l2">
              <div hidden={!this.props.isLoadingData}>
                <LinearProgress />
              </div>
              <div hidden={this.props.isLoadingData}>
                <VisibleRestaurantsTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = propTypes
