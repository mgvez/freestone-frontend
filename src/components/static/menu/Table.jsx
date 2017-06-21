import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export class Table extends Component {
	static propTypes = {
		name: React.PropTypes.string,
		displayLabel: React.PropTypes.string,
		nrecords: React.PropTypes.any,
		id: React.PropTypes.number,
		className: React.PropTypes.string,
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
