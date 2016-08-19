import React, { Component } from 'react';
import { Link } from 'react-router';


export class Table extends Component {
	static propTypes = {
		name: React.PropTypes.string,
		displayLabel: React.PropTypes.string,
		nrecords: React.PropTypes.any,
		id: React.PropTypes.number,
	};

	render() {
		// console.log('table rendered', this.oldtable, this.oldtable === this.props);
		// this.oldtable = this.props;
		return (
			<li className="nav-item">
				<Link to={`/list/${this.props.name}`} activeClassName="active" className="">
					{this.props.displayLabel}
					<span className="nrecords">
						<span className="n">{this.props.nrecords}</span>
					</span>
				</Link>
			</li>
		);
	}
}
