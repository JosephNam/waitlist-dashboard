import { connect } from "react-redux"
import { fetchData } from "../ducks/dashboard"
import FilterInput from "../dashboard/components/FilterInput"

const mapStateToProps = (state) => ({
  rid: state.dashboard.get("rid"),
  startStamp: state.dashboard.get("startStamp"),
  endStamp: state.dashboard.get("endStamp"),
  party_sizes: state.dashboard.get("party_sizes")
})

const mapDispatchToProps = (dispatch) => (
  {
    submitFilters: (rid, start, end, partySizes) => dispatch(fetchData("/estimates",
      {
        restaurant_id: rid,
        startstamp: start,
        endstamp: end
      }, partySizes, false
    ))
  }
)

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterInput)

export default FilterContainer
