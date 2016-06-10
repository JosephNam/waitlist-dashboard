import React from 'react';

export default class Header extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
      <header>
        <nav>
          <div className="nav-wrapper cyan darken-3">
            <a href="#" className="brand-logo"> OpenTable </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#temp1"> TempOne </a> </li>
              <li><a href="#temp2"> TempTwo </a> </li>
              <li><a href="#temp3"> TempThree </a> </li>
            </ul>
          </div>
        </nav>
      </header>
		)
	}
}
