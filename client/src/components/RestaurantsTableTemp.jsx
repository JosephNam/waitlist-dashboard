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
      {_.map(props.data, (datum, i) => (
        <tr key={i}>
          <td key={`timestamp-${i}`}>{datum.timestamp}</td>
          <td key={`party-size-${i}`}>{datum.party_size}</td>
          <td key={`actual-${i}`}>{datum.actual}</td>
          <td key={`quoted-${i}`}>{datum.quoted}</td>
          <td key={`availability-${i}`}>{datum.availability}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

RestaurantsTable.propTypes = {
  data: PropTypes.array
}

export default RestaurantsTable
