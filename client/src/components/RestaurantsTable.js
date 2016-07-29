import React, { PropTypes } from "react"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from "material-ui/Table"

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
        let valid = selectedRows.slice(0)
        if (valid === "") {
          valid = []
        }
        this.props.submitSelectedRows(valid, this.props.data)
      }
    }
  }

  render() {
    return (
      <div>
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
              <TableHeaderColumn tooltip="restaurant_id">restaurant_id</TableHeaderColumn>
              <TableHeaderColumn tooltip="party_size">party_size</TableHeaderColumn>
              <TableHeaderColumn tooltip="actual">actual</TableHeaderColumn>
              <TableHeaderColumn tooltip="quoted">quoted</TableHeaderColumn>
              <TableHeaderColumn tooltip="estimated">estimated</TableHeaderColumn>
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
              selected={this.props.selectedRows.indexOf(index) !== -1}
            >
              <TableRowColumn >{row.restaurant_id}</TableRowColumn>
              <TableRowColumn >{row.party_size}</TableRowColumn>
              <TableRowColumn >{row.actual}</TableRowColumn>
              <TableRowColumn >{row.quoted}</TableRowColumn>
              <TableRowColumn >{row.estimated}</TableRowColumn>
            </TableRow>
            )
          )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

RestaurantsTable.propTypes = {
  data: PropTypes.array,
  selectedRows: PropTypes.array,
  submitSelectedRows: PropTypes.func
}

export default RestaurantsTable
