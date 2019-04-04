import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


export default class Table extends Component {
	static propTypes = {
		name: PropTypes.string,
		displayLabel: PropTypes.string,
		nrecords: PropTypes.any,
		id: PropTypes.number,
		className: PropTypes.string,
	};

	render() {
		// console.log('table rendered', this.oldtable, this.oldtable === this.props);
		// this.oldtable = this.props;
		return (
			<NavLink to={`/list/${this.props.name}`} activeClassName="active" className={this.props.className}>
				{this.props.displayLabel}
				<span className="nrecords">
					<span className="n">{this.props.nrecords}</span>
				</span>
			</NavLink>
		);
	}
}
