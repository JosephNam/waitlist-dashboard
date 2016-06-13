import React, { PropTypes } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Chart from "./Chart.jsx";

const propTypes = {
  elementName : PropTypes.string,
  data        : PropTypes.array,
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <Chart data={this.props.data} elementName={this.props.elementName} />
        </main>
        <Footer />
      </div>
    );
  }

}
