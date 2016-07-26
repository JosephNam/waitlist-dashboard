/* global $: true */
import React, { PropTypes } from "react"
import "react-date-picker/index.css"

const propTypes = {
  submitFilters: PropTypes.func,
  load: PropTypes.func,
  handleStart: PropTypes.func,
  handleEnd: PropTypes.func
}

export default class FilterInput extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      rid: 0,
      start: 0,
      end: 0
    }
    this.handleRIDChange = this.handleRIDChange.bind(this)
  }

  componentDidMount() {
    $(".datepicker.startDate").pickadate({
      selectMonths: true,
      onClose: () => $(document.activeElement).blur(),
      onSet: (ele) => {
        if (ele.select) {
          this.state.start = ele.select
        }
      }
    })

    $(".datepicker.endDate").pickadate({
      selectMonths: true,
      onClose: () => $(document.activeElement).blur(),
      onSet: (ele) => {
        if (ele.select) {
          this.state.end = ele.select
        }
      }
    })
  }

  submit() {
    console.log(this.state)
    if (this.state.start > this.state.end) {
      return
    }
    return
  }

  handleRIDChange(e) {
    this.state.rid = e.target.value
    console.log(this.state)
  }

  render() {
    let ridInput
    return (
      <div className="row">
        <form
          id="filter_inputs"
          className="col s12"
          onSubmit={e => {
            e.preventDefault()
            if (!ridInput.value.trim()) {
              return
            }
            this.props.submitFilters(ridInput.value, this.state.start, this.state.end)
          }}
        >
          <div className="row">
            <div className="input-field col s4">
              <input
                id="rid_input"
                type="text"
                className="validate"
                ref={node => {
                  ridInput = node
                }}
              />
              <label
                htmlFor="rid_input"
              >
                RID
              </label>
            </div>
            <div className="input-field col s4">
              <input
                type="date"
                className="datepicker startDate"
              />
            </div>
            <div className="input-field col s4">
              <input
                type="date"
                className="datepicker endDate"
              />
            </div>
            <button
              className="waves-effect waves-light btn"
              type="submit"
              form="filter_inputs"
              value="submit"
              onClick={() => this.submit()}
            >
              Display
            </button>
          </div>
        </form>
      </div>
    )
  }
}

FilterInput.propTypes = propTypes
