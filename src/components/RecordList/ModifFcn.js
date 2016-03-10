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
			<td className="list-functions">
				<Link to={`/edit/${this.props.tableName}/${this.props.prikey}`} activeClassName="active" className="btn btn-primary btn-sm"><i className="fa fa-pencil"></i><span> Edit</span></Link>
				<a className="btn btn-danger btn-sm"><i className="fa fa-close"></i><span> Delete</span></a>
			</td>
		);
	}
}
