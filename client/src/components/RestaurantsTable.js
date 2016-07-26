import React, { PropTypes } from "react"
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from "material-ui/Table"
import TextField from "material-ui/TextField"

class RestaurantsTable extends React.Component {
  constructor(props) {
    super(props)
    console.log("Table props", this.props)
    this.metastate = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
      onRowSelection:  (row) => {console.log(row)
        console.log(this.props.children.data[row].reservation_id + " is selected")
      }
    }
  }
  // const onRowSelect = (row) => {
  //   console.log(row)
  //   console.log(this.props.children.data[row].reservation_id + " is selected")
  // }

  render() {
    return (
      <div>
        <Table
          height={this.metastate.height}
          fixedHeader={this.metastate.fixedHeader}
          fixedFooter={this.metastate.fixedFooter}
          selectable={this.metastate.selectable}
          multiSelectable={this.metastate.multiSelectable}
          onRowSelection = {this.metastate.onRowSelection}
        >
          <TableHeader
            displaySelectAll={this.metastate.showCheckboxes}
            adjustForCheckbox={this.metastate.showCheckboxes}
            enableSelectAll={this.metastate.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Waitlist Data
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="restaurant_id">restaurant_id</TableHeaderColumn>
              <TableHeaderColumn tooltip="reservation_id">reservation_id</TableHeaderColumn>
              <TableHeaderColumn tooltip="actual">actual</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.metastate.showCheckboxes}
            deselectOnClickaway={this.metastate.deselectOnClickaway}
            showRowHover={this.metastate.showRowHover}
            stripedRows={this.metastate.stripedRows}
          >
            {this.props.children.data.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn >{row.restaurant_id}</TableRowColumn>
                <TableRowColumn >{row.reservation_id}</TableRowColumn>
                <TableRowColumn >{row.actual}</TableRowColumn>

              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}



RestaurantsTable.propTypes = {
  children: PropTypes.object
}
export default RestaurantsTable
