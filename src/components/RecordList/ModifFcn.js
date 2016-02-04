import React, { Component } from 'react';
import { Link } from 'react-router';


export class ModifFcn extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		prikey: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
				
		return (
			<td>
				<Link to={`/edit/${this.props.tableName}/${this.props.prikey}`} activeClassName="active" className="btn btn-xs">Edit</Link>
				<button className="btn btn-xs">Delete</button>
			</td>
		);
	}
}
