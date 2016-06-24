import React from "react"
import * as V from "victory"
import { connect } from "react-redux"
import Visualization from "../components/Visualization"

// TODO need to refactor these nested components into our own components for less verbosity
const getVisibleVisualization = (filter) => {
  switch (filter) {
    case "BAR_GRAPH":
      console.log("yo")
      return <V.VictoryBar />
    case "SCATTER_PLOT":
      return <V.VictoryScatter />
    case "AREA_GRAPH":
      return <V.VictoryArea />
    case "LINE_GRAPH":
      return <V.VictoryLine />
    case "STACKED_BAR_GRAPH":
      return (
        <V.VictoryStack
          height={500}
          colorScale={"qualitative"}
        >
          <V.VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 }
            ]}
          />
          <V.VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 1 }
            ]}
          />
          <V.VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 2 }
            ]}
          />
        </V.VictoryStack>
      )
    case "GROUPED_BAR_GRAPH":
      return (
        <V.VictoryGroup
          height={500}
          offset={20}
          colorScale={"qualitative"}
        >
          <V.VictoryBar
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 }
            ]}
          />
          <V.VictoryBar
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 1 },
              { x: 3, y: 1 }
            ]}
          />
          <V.VictoryBar
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 4 },
              { x: 3, y: 2 }
            ]}
          />
        </V.VictoryGroup>
      )
    default:
      console.log(filter)
      return <V.VictoryBar />
  }
}

const mapStatetoProps = (state) => (
  {
    children: getVisibleVisualization(state.get("visualizationFilter"))
  }
)

const VisibleVisualization = connect(
  mapStatetoProps
)(Visualization)

export default VisibleVisualization
