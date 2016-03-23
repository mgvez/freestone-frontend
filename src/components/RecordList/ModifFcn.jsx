import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { pushStack } from 'actions/nav';

@connect(
	null,
	dispatch => bindActionCreators({ pushStack }, dispatch)
)
export class ModifFcn extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		prikey: React.PropTypes.string,
		
		pushStack: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}
	
	pushStack = () => {
		this.props.pushStack('home', window.pageYOffset);
	};

	render() {
				
		return (
			<td className="list-functions">
				<Link to={`/edit/${this.props.tableName}/${this.props.prikey}`} activeClassName="active" className="btn btn-primary btn-sm" onClick={this.pushStack}><i className="fa fa-pencil"></i><span> Edit</span></Link>
				<a className="btn btn-danger btn-sm"><i className="fa fa-close"></i><span> Delete</span></a>
			</td>
		);
	}
}
