/* eslint new-cap: ["error", { "capIsNewExceptions": ["JSX"] }] */
import React from "react"
import test from "ava"
import { shallow } from "enzyme"
import VisualizationSelection from "../../client/src/components/VisualizationSelection"
import { renderJSX, JSX } from "jsx-test-helpers"
import { setVisualizationFilter,
  VisualizationFilters } from "../../client/src/actions/VisualizationActions"
import Store from "../../client/src/Store"

function switchFilter(filter) {
  console.log(filter)
  Store.dispatch(setVisualizationFilter(filter))
}

// can test react components similar to jquery
test("Should render a list of 5 buttons", t => {
  const wrapper = shallow(<VisualizationSelection />)
  t.is(wrapper.find(".filter-switcher").length, 5)
})

// or can test using the jsx test helpers like
test("renders correct markup", t => {
  const list = [
    VisualizationFilters.BAR_GRAPH,
    VisualizationFilters.SCATTER_PLOT,
    VisualizationFilters.AREA_GRAPH,
    VisualizationFilters.STACKED_BAR_GRAPH,
    VisualizationFilters.GROUPED_BAR_GRAPH
  ]
  const actual = renderJSX(<VisualizationSelection />)
  const expected = JSX(
    <div>
    {list.map((item, index) => (
      <button
        className="filter-switcher waves-effect waves-light btn"
        key={index}
        onClick={() => { switchFilter(item) }}
      >
        {index.toString()}
      </button>
    ))}
    </div>
  )

  t.deepEqual(actual, expected)
})
