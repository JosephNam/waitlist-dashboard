/* global $: true */
import React, { PropTypes } from "react"

export default class StartDatePicker extends React.Component {
  componentDidMount() {
    $(".datepicker.startDate").pickadate({
      selectMonths: true,
      onClose: () => $(document.activeElement).blur(),
      onSet: (ele) => {
        if (ele.select) {
          this.props.setStartDate(ele.select)
        }
      }
    })
  }

  render() {
    return (
      <input
        type="date"
        className="datepicker startDate"
      />
    )
  }
}

StartDatePicker.propTypes = {
  setStartDate: PropTypes.func
}
