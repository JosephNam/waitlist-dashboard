import React, { PropTypes } from "react"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from "material-ui/Table"
import _ from "lodash"

class RestaurantsTable extends React.Component {
  constructor(props) {
    super(props)
    this.metastate = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: true,
      height: "300px",
      onRowSelection: (selectedRows) => {
        _.forEach(selectedRows, (row) => {
          const key = `${this.props.data[row].timestamp}-${this.props.data[row].party_size}`
          console.log(this.props.data[row])
          if (!this.props.selectedStructure[key]) {
            this.props.setSelectedRows(this.props.data[row])
          }
        })
      }
    }
  }

  render() {
    return (
      <Table
        height={this.metastate.height}
        fixedHeader={this.metastate.fixedHeader}
        fixedFooter={this.metastate.fixedFooter}
        selectable={this.metastate.selectable}
        multiSelectable={this.metastate.multiSelectable}
        onRowSelection={this.metastate.onRowSelection}
      >
        <TableHeader
          displaySelectAll={this.metastate.showCheckboxes}
          adjustForCheckbox={this.metastate.showCheckboxes}
          enableSelectAll={this.metastate.enableSelectAll}
        >
          <TableRow>
            <TableHeaderColumn colSpan="5" tooltip="Super Header" style={{ textAlign: "center" }}>
              Waitlist Data
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="timestamp">timestamp</TableHeaderColumn>
            <TableHeaderColumn tooltip="party_size">party_size</TableHeaderColumn>
            <TableHeaderColumn tooltip="actual">actual</TableHeaderColumn>
            <TableHeaderColumn tooltip="quoted">quoted</TableHeaderColumn>
            <TableHeaderColumn tooltip="availability">availability</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.metastate.showCheckboxes}
          deselectOnClickaway={this.metastate.deselectOnClickaway}
          showRowHover={this.metastate.showRowHover}
          stripedRows={this.metastate.stripedRows}
        >
        {this.props.data.map((row, index) => (
          <TableRow
            key={index}
            selected={this.props.selectedStructure[`${row.timestamp}-${row.party_size}`]}
            selectable
          >
            <TableRowColumn>{new Date(row.timestamp).toUTCString()}</TableRowColumn>
            <TableRowColumn>{row.party_size}</TableRowColumn>
            <TableRowColumn>{row.actual}</TableRowColumn>
            <TableRowColumn>{row.quoted}</TableRowColumn>
            <TableRowColumn>{row.availability}</TableRowColumn>
          </TableRow>
          )
        )}
        </TableBody>
      </Table>
    )
  }
}

RestaurantsTable.propTypes = {
  data: PropTypes.array,
  windowWidth: PropTypes.number,
  selectedStructure: PropTypes.object,
  setSelectedRows: PropTypes.func
}

export default RestaurantsTable
