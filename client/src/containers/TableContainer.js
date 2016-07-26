import { connect } from "react-redux"
import { getVisible } from "../helpers/VisualizationHelpers"
import RestaurantsTable from "../components/RestaurantsTable"

const mapStateToProps = (state) => (
  {
    children: {
      data: state.dashboard.get("data")
    }
  }
)

const VisibleRestaurantsTable = connect(
  mapStateToProps
)(RestaurantsTable)

export default VisibleRestaurantsTable
