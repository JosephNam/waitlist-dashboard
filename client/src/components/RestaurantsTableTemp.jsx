import React, { PropTypes } from "react"
import _ from "lodash"

const RestaurantsTable = (props) => (
  <table className="highlight responsive-table">
    <thead>
      <tr>
        <th> Timestamp </th>
        <th> Party Size </th>
        <th> Actual Wait </th>
        <th> Quoted Wait </th>
        <th> Availability Wait </th>
      </tr>
    </thead>
    <tbody>
      {_.map(props.data, (datum) => (
        <tr>
          <td>{datum.timestamp}</td>
          <td>{datum.party_size}</td>
          <td>{datum.actual}</td>
          <td>{datum.quoted}</td>
          <td>{datum.availability}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

RestaurantsTable.propTypes = {
  data: PropTypes.array
}

export default RestaurantsTable
