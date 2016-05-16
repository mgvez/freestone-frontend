import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { pushNavStack } from 'actions/nav';
import { routeSelector } from 'selectors/route';

@connect(
	routeSelector,
	dispatch => bindActionCreators({ pushNavStack }, dispatch)
)
export class ModifFcn extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		prikey: React.PropTypes.string,
		path: React.PropTypes.string,
		
		pushNavStack: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}
	
	pushNavStack = () => {
		this.props.pushNavStack(this.props.path, window.pageYOffset);
	};

	render() {
				
		return (
			<td className="list-functions">
				<Link to={`/edit/${this.props.tableName}/${this.props.prikey}`} activeClassName="active" className="btn btn-primary btn-sm" onClick={this.pushNavStack}><i className="fa fa-pencil"></i><span> Edit</span></Link>
				<a className="btn btn-danger btn-sm"><i className="fa fa-close"></i><span> Delete</span></a>
			</td>
		);
	}
}
