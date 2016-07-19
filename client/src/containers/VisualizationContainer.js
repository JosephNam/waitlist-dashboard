import { connect } from "react-redux"
import { getVisible } from "../helpers/VisualizationHelpers"
import Visualization from "../components/Visualization"

const mapStatetoProps = (state) => (
  {
    children: {
      graph: getVisible(state.get("visualizationFilter"))
    }
  }
)

const VisibleVisualization = connect(
  mapStatetoProps
)(Visualization)

export default VisibleVisualization
