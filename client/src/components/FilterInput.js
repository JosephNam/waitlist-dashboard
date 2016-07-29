/* global $: true */
import React, { PropTypes } from "react"
import "react-date-picker/index.css"
import DatePicker from "material-ui/DatePicker"
import TextField from "material-ui/TextField"
import FlatButton from "material-ui/FlatButton"

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
    this.handleStart = this.handleStart.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
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
  }

  handleStart(e, date) {
    this.state.start = date.valueOf()
  }

  handleEnd(e, date) {
    this.state.end = date.valueOf()
  }

  render() {
    return (
      <div className="row">
        <form
          id="filter_inputs"
          className="col s12"
          onSubmit={e => {
            e.preventDefault()
            this.props.submitFilters(this.state.rid, this.state.start, this.state.end)
          }}
        >
          <div className="row">
            <div className="col s2 offset-s2">
              <TextField
                hintText="Search By RID(s)"
                onChange={this.handleRIDChange}
              />
            </div>
            <div className="col s2">
              <DatePicker
                autoOk
                hintText="Start date of filter"
                onChange={this.handleStart}
              />
            </div>
            <div className="col s2">
              <DatePicker
                autoOk
                hintText="End date of filter"
                onChange={this.handleEnd}
              />
            </div>
            <div className="col s2">
              <FlatButton
                label="Display"
                type="submit"
                form="filter_inputs"
                value="submit"
                primary
                onClick={() => this.submit()}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

FilterInput.propTypes = propTypes
