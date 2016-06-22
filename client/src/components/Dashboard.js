import React from "react"
import VisibleVisualization from "../containers/VisualizationContainer"
import VisualizationSelection from "./VisualizationSelection"

const Dashboard = () => (
  <div className="container">
    <div className="row">
      <VisualizationSelection />
    </div>
    <div className="row">
      <VisibleVisualization />
    </div>
  </div>
)

export default Dashboard
