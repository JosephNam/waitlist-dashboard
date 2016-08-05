import React, { PropTypes } from "react"
import CircularProgress from "material-ui/CircularProgress"
import LinearProgress from "material-ui/LinearProgress"
// import VisibleVisualization from "../containers/VisualizationContainer"
import VisualizationSelection from "./VisualizationSelection"
import FilterContainer from "../containers/FilterContainer"
// import VisibleRestaurantsTable from "../containers/TableContainer"
import StatBadges from "./StatBadges"
import { VisualizationFilters } from "../actions/VisualizationActions"
// import { getVisible } from "../helpers/VisualizationHelpers"
import PanelControls from "./PanelControls"
import RestaurantsTable from "./RestaurantsTable"
import getVisible from "../helpers/VisualizationHelpers"

const propTypes = {
  load: PropTypes.func,
  dataFilter: PropTypes.object,
  isLoadingData: PropTypes.bool,
  overquoted: PropTypes.number,
  windowWidth: PropTypes.number,
  data: PropTypes.array,
  visualizationFilter: PropTypes.oneOf([
    VisualizationFilters.BAR_GRAPH,
    VisualizationFilters.LINE_GRAPH,
    VisualizationFilters.SCATTER_PLOT
  ]),
  isInitialLoad: PropTypes.bool,
  submitSelectedPoint: PropTypes.func,
  selectedRows: PropTypes.array,
  reloadData: PropTypes.func,
  party_sizes: PropTypes.array,
  start: PropTypes.number,
  end: PropTypes.number,
  selectedStructure: PropTypes.object,
  startStamp: PropTypes.number,
  endStamp: PropTypes.number,
  rid: PropTypes.array
}

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.filter = {
      startstamp: this.props.startStamp,
      endstamp: this.props.endStamp,
      party_sizes: this.props.party_sizes,
      rid: this.props.rid
    }
    this.props.load("/estimates", this.filter, this.props.party_sizes, true)
    console.log(this.props.dataFilter)
    this.state = {
      start: 0,
      end: -1,
      selectedRows: this.props.selectedRows,
      selectedStructure: this.props.selectedStructure
    }
    this.setSelectedRows = this.setSelectedRows.bind(this)
    console.log(this.state)
  }

  setSelectedRows(row) {
    const temp = this.state.selectedStructure
    temp[`${row.timestamp}-${row.party_size}`] = !temp[`${row.timestamp}-${row.party_size}`]
    console.log(row)
    this.setState({
      start: this.state.start,
      end: this.state.end,
      selectedRows: this.props.selectedRows,
      selectedStructure: temp
    })
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
              <PanelControls
                reloadData={this.props.reloadData}
                dataFilter={this.filter}
              />
            </div>
            <div className="col l8 visualization">
              <div hidden={!this.props.isLoadingData}>
                <LinearProgress />
              </div>
              <div hidden={this.props.isLoadingData}>
                {getVisible(this.props.visualizationFilter,
                  this.props.data,
                  this.props.windowWidth,
                  this.props.start,
                  this.props.end,
                  this.state.selectedStructure,
                  this.setSelectedRows
                )}
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
                <RestaurantsTable
                  data={this.props.data}
                  selectedStructure={this.state.selectedStructure}
                  setSelectedRows={this.setSelectedRows}
                  windowWidth={this.props.windowWidth}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = propTypes
