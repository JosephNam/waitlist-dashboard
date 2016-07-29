import { connect } from "react-redux"
import { fetchData } from "../actions/DashboardActions"

import FilterInput from "../components/FilterInput"

const mapStateToProps = (state) => ({
  rid: state.dashboard.get("rid"),
  startStamp: state.dashboard.get("startStamp"),
  endStamp: state.dashboard.get("endStamp")
})

const mapDispatchToProps = (dispatch) => (
  {
    submitFilters: (rid, start, end) => dispatch(fetchData("/estimates",
      {
        restaurant_id: rid,
        startstamp: start,
        endstamp: end
      }, false
    ))
  }
)

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterInput)
export default FilterContainer
