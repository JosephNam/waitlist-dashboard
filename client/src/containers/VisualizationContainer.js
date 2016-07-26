import { connect } from "react-redux"
import { getVisible } from "../helpers/VisualizationHelpers"
import Visualization from "../components/Visualization"

const mapStateToProps = (state) => (
  {
    children: {
      graph: getVisible(state.visualization.get("visualizationFilter"),
        state.dashboard.get("data"))
    }
  }
)

const VisibleVisualization = connect(
  mapStateToProps
)(Visualization)

export default VisibleVisualization
