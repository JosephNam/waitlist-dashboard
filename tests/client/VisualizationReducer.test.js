import visualizationApp from "../../client/src/reducers/VisualizationReducers"
import {
  setVisualizationFilter,
  VisualizationFilters
} from "../../client/src/actions/VisualizationActions"
import test from "ava"
import { Map } from "immutable"

const initialState = new Map({
  visualizationFilter: VisualizationFilters.BAR_GRAPH
})

test("sets the visualization filter to BAR_GRAPH", t => {
  const nextState = visualizationApp(initialState,
    setVisualizationFilter(VisualizationFilters.BAR_GRAPH))
  t.deepEqual(nextState, new Map({
    visualizationFilter: VisualizationFilters.BAR_GRAPH
  }))
})

test("sets the visualization filter to SCATTER_PLOT", t => {
  const nextState = visualizationApp(initialState,
    setVisualizationFilter(VisualizationFilters.SCATTER_PLOT))
  t.deepEqual(nextState, new Map({
    visualizationFilter: VisualizationFilters.SCATTER_PLOT
  }))
})

test("sets the visualization filter to GROUPED_BAR_GRAPH", t => {
  const nextState = visualizationApp(initialState,
    setVisualizationFilter(VisualizationFilters.GROUPED_BAR_GRAPH))
  t.deepEqual(nextState, new Map({
    visualizationFilter: VisualizationFilters.GROUPED_BAR_GRAPH
  }))
})

test("sets the visualization filter to STACKED_BAR_GRAPH", t => {
  const nextState = visualizationApp(initialState,
    setVisualizationFilter(VisualizationFilters.STACKED_BAR_GRAPH))
  t.deepEqual(nextState, new Map({
    visualizationFilter: VisualizationFilters.STACKED_BAR_GRAPH
  }))
})

test("sets the visualization filter to AREA_GRAPH", t => {
  const nextState = visualizationApp(initialState,
    setVisualizationFilter(VisualizationFilters.AREA_GRAPH))
  t.deepEqual(nextState, new Map({
    visualizationFilter: VisualizationFilters.AREA_GRAPH
  }))
})
