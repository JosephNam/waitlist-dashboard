import React, { PropTypes } from "react"
import { connect } from "react-redux"
import CircularProgress from "material-ui/CircularProgress"
import LinearProgress from "material-ui/LinearProgress"
import Paper from "material-ui/Paper"
import VisualizationSelection from "../visualization/components/Tabs"
import FilterContainer from "../containers/FilterContainer"
import StatBadges from "./components/StatBadges"
import { VisualizationFilters } from "../ducks/visualization"
import RestaurantsTable from "../table/RestaurantsTable"
import FilterSettings from "./components/SettingsList"
import { fetchData, reload, setSelectedPoint } from "../ducks/dashboard"
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
  rid: PropTypes.array,
  desired: PropTypes.object
}

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props)
    this.filter = {
      startstamp: this.props.startStamp,
      endstamp: this.props.endStamp,
      party_sizes: this.props.party_sizes,
      rid: this.props.rid
    }
    this.props.load("/estimates", this.filter, this.props.party_sizes, true)
    this.state = {
      start: 0,
      end: -1,
      selectedRows: this.props.selectedRows,
      selectedStructure: this.props.selectedStructure
    }
    this.setSelectedRows = this.setSelectedRows.bind(this)
  }

  setSelectedRows(row) {
    const temp = this.state.selectedStructure
    temp[`${row.timestamp}-${row.party_size}`] = !temp[`${row.timestamp}-${row.party_size}`]
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
          <CircularProgress size={2} color={"red"} />
        </div>
        <div hidden={this.props.isInitialLoad}>
          <div className="badges">
            <StatBadges overquoted={this.props.overquoted} />
          </div>
          <div className="row">
            <div className="col l11 m11 s11">
              <div hidden={!this.props.isLoadingData}>
                <LinearProgress color={"red"} />
              </div>
              <div hidden={this.props.isLoadingData}>
                <div className="row">
                  <FilterContainer />
                  <div className="row">
                    <div className="col l2 m6 s10 offset-s1">
                      <FilterSettings
                        reloadData={this.props.reloadData}
                        dataFilter={this.filter}
                      />
                    </div>
                    <div id="visualization" className="col l9 m12 s10 offset-s1">
                      <VisualizationSelection />
                      {getVisible(this.props.visualizationFilter,
                        this.props.data,
                        this.props.windowWidth)}
                      <Paper zDepth={1}>
                        <RestaurantsTable
                          data={this.props.data}
                        />
                      </Paper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="page-footer blue-grey darken-4" hidden={this.props.isLoadingData}>
            <div className="footer_container" >
              <div className="row">
                <div className="col l6 s12">
                  <h5 className="white-text">Location</h5>
                  <p className="grey-text text-lighten-4">701 Cherry St, Chattanooga, TN 37402</p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Codes</h5>
                  <ul>
                    <li><a className="grey-text text-lighten-3" href="https://github.com/opentable/waitlist-dashboard.git">Github</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright" >
              <div className="container">
              Copyright © 2016 OpenTable, Inc. - All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

DashboardComponent.propTypes = propTypes

const mapStateToProps = (state) => ({
  data: state.dashboard.get("data"),
  isLoadingData: state.dashboard.get("isLoadingData"),
  overquoted: state.dashboard.get("overquoted"),
  windowWidth: state.dashboard.get("windowWidth"),
  visualizationFilter: state.visualization.get("visualizationFilter"),
  isInitialLoad: state.dashboard.get("isInitialLoad"),
  selectedRows: state.dashboard.get("selectedRows"),
  party_sizes: state.dashboard.get("party_sizes"),
  selectedStructure: state.dashboard.get("selectedStructure"),
  startStamp: state.dashboard.get("startStamp"),
  endStamp: state.dashboard.get("endStamp")
})

const mapDispatchToProps = (dispatch) => (
  {
    load: (url, partySizes, filters, isInitial) => {
      dispatch(fetchData(url, partySizes, filters, isInitial))
    },
    submitSelectedPoint: (selectedPoint, selectedRaw, data) => {
      dispatch(setSelectedPoint(selectedPoint, selectedRaw, data))
    },
    reloadData: (partySizes, filter) => { dispatch(reload(partySizes, filter)) }
  }
)

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent)

export default Dashboard
