/* global $: true */
import React, { PropTypes } from "react"

export default class EndDatePicker extends React.Component {
  componentDidMount() {
    $(".datepicker.endDate").pickadate({
      selectMonths: true,
      onClose: () => $(document.activeElement).blur(),
      onSet: (ele) => {
        if (ele.select) {
          this.props.setEndDate(ele.select)
        }
      }
    })
  }

  render() {
    return (
      <input
        type="date"
        className="datepicker endDate"
      />
    )
  }
}

EndDatePicker.propTypes = {
  setEndDate: PropTypes.func
}
