import { connect } from "react-redux"
import { fetchData, setSelectedPoint } from "../actions/DashboardActions"

import Dashboard from "../components/Dashboard"

const mapStateToProps = (state) => ({
  data: state.dashboard.get("data"),
  dataFilter: state.dashboard.toJS().dataFilter,
  isLoadingData: state.dashboard.get("isLoadingData"),
  overquoted: state.dashboard.get("overquoted"),
  windowWidth: state.dashboard.get("windowWidth"),
  visualizationFilter: state.visualization.get("visualizationFilter"),
  isInitialLoad: state.dashboard.get("isInitialLoad"),
  selectedRows: state.dashboard.get("selectedRows")
})

const mapDispatchToProps = (dispatch) => (
  {
    load: (url, filters, isInitial) => { dispatch(fetchData(url, filters, isInitial)) },
    submitSelectedPoint: (selectedPoint, selectedRaw, data) => {
      dispatch(setSelectedPoint(selectedPoint, selectedRaw, data))
    }
  }
)

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
