import { connect } from "react-redux"
import RestaurantsTable from "../components/RestaurantsTable"
import { setSelectedRows } from "../actions/DashboardActions"

const mapStateToProps = (state) => (
  {
    data: state.dashboard.get("data"),
    selectedRows: state.dashboard.get("selectedRows")
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    submitSelectedRows: (selectedRows, oldData) => dispatch(setSelectedRows(selectedRows, oldData))
  }
)

const VisibleRestaurantsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsTable)

export default VisibleRestaurantsTable
