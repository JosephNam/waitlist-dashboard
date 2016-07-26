import { connect } from "react-redux"
import { fetchData } from "../actions/DashboardActions"

import Dashboard from "../components/Dashboard"

const mapStateToProps = (state) => ({
  dataFilter: state.dashboard.get("dataFilter"),
  isLoadingData: state.dashboard.get("isLoadingData")
})

const mapDispatchToProps = (dispatch) => (
  {
    load: (url, filters) => { dispatch(fetchData(url, filters)) }
  }
)

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
