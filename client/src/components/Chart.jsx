import React, { PropTypes } from 'react';
import D3Chart from '../models/d3Chart.js';

const propTypes = {
  elementName: PropTypes.string,
  data: PropTypes.array,
};

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.chart = new D3Chart(this.props.elementName, this.props.data);
  }

  render() {
    return (
      <svg className={this.props.elementName}>
      </svg>
    );
  }
}

Chart.propTypes = propTypes;
