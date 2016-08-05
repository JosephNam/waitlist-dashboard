import { connect } from "react-redux"
import { fetchData, reload, setSelectedPoint } from "../actions/DashboardActions"

import Dashboard from "../components/Dashboard"

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

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
