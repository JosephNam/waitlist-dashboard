import {
  setVisualizationFilter,
  VisualizationFilters }
  from "../../client/src/actions/VisualizationActions"
import test from "ava"

test("switching to BAR_GRAPH filter ", t => {
  t.deepEqual(
    setVisualizationFilter(VisualizationFilters.BAR_GRAPH),
    {
      type: "SET_VISUALIZATION_FILTER",
      filter: "BAR_GRAPH"
    }
  )
})

test("switching to SCATTER_PLOT filter", t => {
  t.deepEqual(
    setVisualizationFilter(VisualizationFilters.SCATTER_PLOT),
    {
      type: "SET_VISUALIZATION_FILTER",
      filter: "SCATTER_PLOT"
    }
  )
})

test("switching to GROUPED_BAR_GRAPH filter", t => {
  t.deepEqual(
    setVisualizationFilter(VisualizationFilters.GROUPED_BAR_GRAPH),
    {
      type: "SET_VISUALIZATION_FILTER",
      filter: "GROUPED_BAR_GRAPH"
    }
  )
})

test("switching to STACKED_BAR_GRAPH filter", t => {
  t.deepEqual(
    setVisualizationFilter(VisualizationFilters.STACKED_BAR_GRAPH),
    {
      type: "SET_VISUALIZATION_FILTER",
      filter: "STACKED_BAR_GRAPH"
    }
  )
})

test("switching to AREA_GRAPH filter", t => {
  t.deepEqual(
    setVisualizationFilter(VisualizationFilters.AREA_GRAPH),
    {
      type: "SET_VISUALIZATION_FILTER",
      filter: "AREA_GRAPH"
    }
  )
})
