import React, { Component } from 'react';
import { Link } from 'react-router';


export class Table extends Component {
	static propTypes = {
		name: React.PropTypes.string,
		actionLabel: React.PropTypes.string,
		nrecords: React.PropTypes.any,
		id: React.PropTypes.number,
	};

	constructor(props) {
		super(props);
	}

	render() {
		// console.log('table rendered', this.oldtable, this.oldtable === this.props);
		// this.oldtable = this.props;
		return (
			<li>
				<Link to={`/list/${this.props.name}`} activeClassName="active" className="">{this.props.actionLabel} <span className="nrecords">{this.props.nrecords}</span></Link>
				
			</li>
		);
	}
}
