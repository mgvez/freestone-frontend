import React, { Component } from 'react';
import { Link } from 'react-router';


export class Table extends Component {
	static propTypes = {
		name: React.PropTypes.string,
		actionLabel: React.PropTypes.string,
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
				<Link to={`/table/${this.props.name}`} activeClassName="active" className="btn btn-xs">{this.props.actionLabel}</Link>
			</li>
		);
	}
}
